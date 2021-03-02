// Global dependencies
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// Global Environment Variables
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// Local dependencies
const routes = require('./constants/routes');
const usersRouter = require('./routes/users');
const { CORS_ORIGIN_WHITELIST, DATABASE_URL } = require('./config');

// CORS options
const corsOptions = {
    origin(origin, callback) {
      if (CORS_ORIGIN_WHITELIST.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };

// Express app rules
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use(routes.USERS, usersRouter);

// Error handling
app.use((error, req, res, next) => {
  return res.status(error.status).json(error);
});

// Connect to database
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = app;
