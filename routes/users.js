const express = require('express');
const router = express.Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/userController');

// GET /users - Gets a list of every user
router.get('/', getUsers);

// GET /users/id - Gets an object for the user with id :id
router.get('/:id', getUserById);

// POST /users - Creates a new user
router.post('/', createUser);

// PATCH /users/:id - Updates the user with id :id
router.patch('/:id', updateUser);

// DELETE /users/:id - Deletes the user with id :id
router.delete('/:id', deleteUser);

module.exports = router;
