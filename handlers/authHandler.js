// Global dependencies
const jwt = require('jsonwebtoken');

// Local dependencies
const { e401, e403, e404, e500 } = require('../constants/Errors');
const { ACCESS_TOKEN_EXPIRATION } = require('../constants/Auth');
User = require('../models/userModel');

// Variables
let refreshTokens = [];

// Tries to log in
exports.login = async (req, res, next) => {
    try {
        // Get user's login data
        const { email, password } = req.body;
        // Request user from database
        const user = await User.findOne({email: email, password: password}).exec();
        // If not found, return not found error
        if (!user)
            next(e404);
        // If found, create access token and refresh token
        const accessToken = jwt.sign({ username: user.name }, process.env.JWT_MAIN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
        const refreshToken = jwt.sign({ username: user.name }, process.env.JWT_REFRESH_SECRET);
        // Save refresh token for later
        refreshTokens.push(refreshToken);
        // Retrieve tokens
        res.json({
            message: 'User logged in',
            data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
            }
        });
    } catch (error) {
        // If not, log error and return it
        console.log(JSON.stringify(error));
        next(e500);
    }
};

// Tries to log out
exports.logout = (req, res, next) => {
    try {
        const { token } = req.body;
        console.log(token);
        console.log(refreshTokens);
        refreshTokens = refreshTokens.filter(item => item !== token);
        res.json({
            message: 'Log out successful',
        });
    } catch (error) {
        console.log(JSON.stringify(error));
        next(e500);
    }
    
};

// Check JWT token
exports.authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_MAIN_SECRET, (err, user) => {
            if (err)
                return res.status(403).send(e403);
            next();
        });
    } else {
        return res.status(401).send(e401);
    }
};

// Refresh JWT token
exports.refreshJWT = (req, res, next) => {
    // Get token from body and check for basic errors
    const { token } = req.body;
    if (!token)
        return res.status(401).send(e401);
    if (!refreshTokens.includes(token))
        return res.status(403).send(e403);
    
    // Check if refresh token is correct
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err)
            return res.status(403).send(e403);
        // If it is, produce new access token
        const accessToken = jwt.sign({ username: user.username }, process.env.JWT_MAIN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
        res.json({
            message: 'User authenticated',
            data: {
                accessToken: accessToken
            }
        });
    });
};

// Check refresh JWT tokens
exports.checkJWT = (req, res, next) => {
    res.json({
        message: 'Refresh tokens',
        data: {
            tokens: refreshTokens
        }
    });
};
