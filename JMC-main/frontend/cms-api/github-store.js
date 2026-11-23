// Production storage for the CMS API: reads and commits files in the GitHub repository.
// Needs GITHUB_TOKEN (a fine-grained token with "Contents: read and write" on the repo).
// Each save is one commit on GITHUB_BRANCH, which triggers a redeploy.
const API = 'https://api.github.com';

function githubStore(env = process.env) {
  const repo = env.GITHUB_REPO || 'Olsiii/JMC-main';
  const branch = env.GITHUB_BRANCH || 'main';
  if (!env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is not set');

  async function gh(path, { method = 'GET', body } = {}) {
    const res = await fetch(`${API}/repos/${repo}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'jmc-legal-cms',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (res.status === 404 && method === 'GET') return null;
    if (!res.ok) throw new Error(`GitHub ${method} ${path}: ${res.status} ${await res.text()}`);
    return res.json();
  }

  const contentsUrl = (path) => `/contents/${path.split('/').map(encodeURIComponent).join('/')}?ref=${encodeURIComponent(branch)}`;

  return {
    type: 'github',

    async read(path) {
      const meta = await gh(contentsUrl(path));
      if (!meta || Array.isArray(meta) || meta.type !== 'file') return null;
      // The contents API inlines files up to 1 MB; larger ones come from the blob API.
      const base64 = meta.content ? meta.content : (await gh(`/git/blobs/${meta.sha}`)).content;
      return { id: meta.sha, content: Buffer.from(base64, 'base64') };
    },

    async list(folder) {
      const items = await gh(contentsUrl(folder));
      return Array.isArray(items) ? items.filter((i) => i.type === 'file').map((i) => i.path) : [];
    },

    // changes: [{ path, content: Buffer | null }]; null deletes the file. One commit for all.
    async commit(changes, message) {
      const ref = await gh(`/git/ref/heads/${encodeURIComponent(branch)}`);
      const parent = await gh(`/git/commits/${ref.object.sha}`);
      const tree = await Promise.all(
        changes.map(async ({ path, content }) => {
          if (content === null) return { path, mode: '100644', type: 'blob', sha: null };
          const blob = await gh('/git/blobs', { method: 'POST', body: { content: content.toString('base64'), encoding: 'base64' } });
          return { path, mode: '100644', type: 'blob', sha: blob.sha };
        })
      );
      const newTree = await gh('/git/trees', { method: 'POST', body: { base_tree: parent.tree.sha, tree } });
      const commit = await gh('/git/commits', { method: 'POST', body: { message, tree: newTree.sha, parents: [ref.object.sha] } });
      await gh(`/git/refs/heads/${encodeURIComponent(branch)}`, { method: 'PATCH', body: { sha: commit.sha } });
    },
  };
}

module.exports = { githubStore };
