// Global dependencies
const express = require('express');
const router = express.Router();

// Local dependencies
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { authJWT } = require('../handlers/authHandler');

// GET /users - Gets a list of every user
router.get('/', authJWT, getUsers);

// GET /users/id - Gets an object for the user with id :id
router.get('/:id', authJWT, getUserById);

// POST /users - Creates a new user
router.post('/', authJWT, createUser);

// PATCH /users/:id - Updates the user with id :id
router.patch('/:id', authJWT, updateUser);

// DELETE /users/:id - Deletes the user with id :id
router.delete('/:id', authJWT, deleteUser);

module.exports = router;
