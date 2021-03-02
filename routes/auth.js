// Global dependencies
const express = require('express');
const router = express.Router();

// Local dependencies
const { login, logout, authJWT, refreshJWT, checkJWT } = require('../handlers/authHandler');

// POST /auth/login - Tries to log in
router.post('/login', login);

// POST /auth/logout - Tries to log out
router.post('/logout', authJWT, logout);

// POST /auth/token - Asks for new access token
router.post('/token', refreshJWT);

// GET /auth/token - Gets list of refresh tokens
router.get('/token', checkJWT);

module.exports = router;
