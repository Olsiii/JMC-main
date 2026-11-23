// Development only (Create React App loads this into `npm start`): serves the CMS API at
// /api/cms against the local files, so /admin can be tried without GitHub.
// Set ADMIN_PASSWORD in frontend/.env.local (gitignored) to sign in locally.
const express = require('express');
const { handle } = require('../cms-api/handler');
const { fsStore } = require('../cms-api/fs-store');

require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') });

module.exports = function setupProxy(app) {
  app.post('/api/cms', express.json({ limit: '20mb' }), async (req, res) => {
    const { status, body } = await handle({ headers: req.headers, body: req.body }, fsStore());
    res.status(status).json(body);
  });
};
