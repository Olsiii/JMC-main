// Netlify Function behind /api/cms (see public/_redirects). Settings needed on Netlify:
// ADMIN_PASSWORD, GITHUB_TOKEN, and optionally GITHUB_REPO / GITHUB_BRANCH.
const { handle } = require('../../cms-api/handler');
const { githubStore } = require('../../cms-api/github-store');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: '' };

  let body = {};
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : event.body;
    body = JSON.parse(raw || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request' }) };
  }

  let store;
  try {
    store = githubStore();
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: 'The CMS is not configured on the server (GITHUB_TOKEN).' }) };
  }

  const { status, body: result } = await handle({ headers: event.headers, body }, store);
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(result),
  };
};
