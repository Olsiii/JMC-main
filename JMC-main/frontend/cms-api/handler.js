// Password-protected API behind the CMS at /admin.
//
// Decap CMS's "proxy" backend POSTs { action, params } here (the same protocol as Decap's
// local server). Every action except "login" needs a session token, which "login" issues
// for the right password. The password lives only in the ADMIN_PASSWORD environment
// variable, never in the code or the browser.
//
// Storage is pluggable: GitHub in production (netlify/functions/cms.js), the local file
// system in development (src/setupProxy.js).
const crypto = require('crypto');

const CONTENT_DIR = 'JMC-main/frontend/src/content/';
const UPLOADS_DIR = 'JMC-main/frontend/public/images/uploads/';
const IMAGES_DIR = 'JMC-main/frontend/public/images/';

const SESSION_HOURS = 12;
// Media library thumbnails are sent inline; keep responses well under the 6 MB function limit.
const MEDIA_RESPONSE_BUDGET = 4 * 1024 * 1024;

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// ─── Sessions ─────────────────────────────────────────────────────────────────

// Changing ADMIN_PASSWORD (or the GitHub token) invalidates every open session.
const sessionKey = (env) =>
  crypto.createHash('sha256').update(`jmc-cms:${env.ADMIN_PASSWORD}:${env.GITHUB_TOKEN || ''}`).digest();

const sign = (env, payload) => crypto.createHmac('sha256', sessionKey(env)).update(payload).digest('hex');

const sameText = (a, b) => {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
};

function issueToken(env) {
  const expires = String(Date.now() + SESSION_HOURS * 3600 * 1000);
  return `${expires}.${sign(env, expires)}`;
}

function checkToken(env, header) {
  const token = (header || '').replace(/^Bearer\s+/i, '');
  const [expires, signature] = token.split('.');
  if (!expires || !signature || Number(expires) < Date.now() || !sameText(signature, sign(env, expires))) {
    throw new HttpError(401, 'Please sign in again.');
  }
}

// ─── Paths ────────────────────────────────────────────────────────────────────

// The CMS may only read content and images, and only write content and uploads.
function safePath(p, { write = false } = {}) {
  const path = String(p || '').replace(/\\/g, '/');
  const roots = write ? [CONTENT_DIR, UPLOADS_DIR] : [CONTENT_DIR, IMAGES_DIR];
  if (path.split('/').some((part) => part === '..' || part === '') || !roots.some((r) => path.startsWith(r))) {
    throw new HttpError(403, `Not allowed: ${path}`);
  }
  return path;
}

const folderPath = (p) => safePath(`${String(p).replace(/\/+$/, '')}/x`).slice(0, -2);

const baseName = (p) => p.split('/').pop();

// ─── Actions ──────────────────────────────────────────────────────────────────

async function readEntries(store, files) {
  return Promise.all(
    files.map(async ({ path, label }) => {
      const file = await store.read(safePath(path));
      return file
        ? { data: file.content.toString('utf8'), file: { path, label, id: file.id } }
        : { data: null, file: { path, label, id: null } };
    })
  );
}

async function readMedia(store, path, withContent = true) {
  const file = await store.read(safePath(path));
  if (!file) throw new HttpError(404, `Not found: ${path}`);
  return {
    id: file.id,
    content: withContent ? file.content.toString('base64') : '',
    encoding: 'base64',
    path,
    name: baseName(path),
  };
}

const actions = {
  info: async (store) => ({ repo: 'JMC-main', publish_modes: ['simple'], type: store.type }),

  entriesByFolder: async (store, { folder, extension }) => {
    const files = (await store.list(folderPath(folder))).filter((p) => p.endsWith(extension));
    return readEntries(store, files.map((path) => ({ path })));
  },

  entriesByFiles: async (store, { files }) => readEntries(store, files),

  getEntry: async (store, { path }) => (await readEntries(store, [{ path }]))[0],

  persistEntry: async (store, { dataFiles = [], assets = [], options = {} }) => {
    const changes = [
      ...dataFiles.map((f) => ({ path: safePath(f.newPath || f.path, { write: true }), content: Buffer.from(f.raw, 'utf8') })),
      ...dataFiles
        .filter((f) => f.newPath && f.newPath !== f.path)
        .map((f) => ({ path: safePath(f.path, { write: true }), content: null })),
      ...assets.map((a) => ({ path: safePath(a.path, { write: true }), content: Buffer.from(a.content, 'base64') })),
    ];
    await store.commit(changes, options.commitMessage || 'CMS: update content');
    return { message: 'entry persisted' };
  },

  getMedia: async (store, { mediaFolder }) => {
    const paths = (await store.list(folderPath(mediaFolder))).filter((p) => !baseName(p).startsWith('.'));
    let budget = MEDIA_RESPONSE_BUDGET;
    const files = [];
    for (const path of paths) {
      const file = await readMedia(store, path, budget > 0);
      budget -= file.content.length;
      files.push(file);
    }
    return files;
  },

  getMediaFile: async (store, { path }) => readMedia(store, path),

  persistMedia: async (store, { asset, options = {} }) => {
    const path = safePath(asset.path, { write: true });
    await store.commit([{ path, content: Buffer.from(asset.content, 'base64') }], options.commitMessage || `CMS: upload ${baseName(path)}`);
    return { id: crypto.randomUUID(), content: asset.content, encoding: 'base64', path, name: baseName(path) };
  },

  deleteFile: async (store, { path, options = {} }) => {
    await store.commit([{ path: safePath(path, { write: true }), content: null }], options.commitMessage || `CMS: delete ${baseName(path)}`);
    return { message: `deleted file ${path}` };
  },

  deleteFiles: async (store, { paths = [], options = {} }) => {
    await store.commit(
      paths.map((p) => ({ path: safePath(p, { write: true }), content: null })),
      options.commitMessage || 'CMS: delete files'
    );
    return { message: `deleted files ${paths.join(', ')}` };
  },

  getDeployPreview: async () => null,
};

// ─── Entry point ──────────────────────────────────────────────────────────────

// request: { headers (lower-case keys), body (parsed JSON) }. Returns { status, body }.
async function handle({ headers = {}, body = {} }, store, env = process.env) {
  try {
    if (!env.ADMIN_PASSWORD) throw new HttpError(500, 'The CMS password (ADMIN_PASSWORD) is not set on the server.');

    if (body.action === 'login') {
      if (!sameText(body.password || '', env.ADMIN_PASSWORD)) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // slow down guessing
        throw new HttpError(401, 'Wrong password.');
      }
      return { status: 200, body: { token: issueToken(env), hours: SESSION_HOURS } };
    }

    checkToken(env, headers.authorization);

    const action = actions[body.action];
    if (!action) throw new HttpError(422, `Unknown action ${body.action}`);
    return { status: 200, body: await action(store, body.params || {}) };
  } catch (e) {
    if (!(e instanceof HttpError)) console.error('[cms]', body.action, e);
    return { status: e.status || 500, body: { error: e instanceof HttpError ? e.message : 'Something went wrong. Please try again.' } };
  }
}

module.exports = { handle };
