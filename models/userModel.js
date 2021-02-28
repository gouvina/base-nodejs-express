// Global dependencies
const mongoose = require('mongoose');

// Local dependencies
const { USERS_COLLECTION } = require('../constants/Db');

// Setup schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Export model
const User = module.exports = mongoose.model('user', userSchema, USERS_COLLECTION);
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}