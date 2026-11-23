// Development storage for the CMS API: reads and writes files in the local checkout,
// so the CMS can be tried with `npm start` without touching GitHub.
const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '../../..');

function fsStore(root = REPO_ROOT) {
  const abs = (p) => path.join(root, p);
  return {
    type: 'local_fs',

    async read(p) {
      try {
        const content = await fs.readFile(abs(p));
        return { id: crypto.createHash('sha256').update(content).digest('hex'), content };
      } catch {
        return null;
      }
    },

    async list(folder) {
      try {
        const entries = await fs.readdir(abs(folder), { withFileTypes: true });
        return entries.filter((e) => e.isFile()).map((e) => `${folder}/${e.name}`);
      } catch {
        return [];
      }
    },

    async commit(changes) {
      for (const { path: p, content } of changes) {
        if (content === null) {
          await fs.rm(abs(p), { force: true });
        } else {
          await fs.mkdir(path.dirname(abs(p)), { recursive: true });
          await fs.writeFile(abs(p), content);
        }
      }
    },
  };
}

module.exports = { fsStore };
