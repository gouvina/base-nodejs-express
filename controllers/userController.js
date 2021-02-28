// Local dependencies
User = require('../models/userModel');
const { e404, e500 } = require('../constants/Errors');

// Get list of users
exports.getUsers = async (req, res, next) => {
  try {
    // Get users from database
    User.get(function (err, users) {
      if (err)
        next(e500);
      res.json({
        message: "Users retrieved",
        data: users
      });
    });
  } catch (error) {
    next(e500);
  }
};

// Get user by id
exports.getUserById = (req, res, next) => {
  try {
    // Get user from database
    User.findById(req.params.id, function (err, user) {
      if (err)
        next(e500);
      res.json({
        message: 'User retrieved',
        data: user
      });
    });
  } catch (error) {
    next(e500);
  }
};

// Post new user generating id
exports.createUser = (req, res, next) => {
  try {
      // Create user and load its data
      let user = new User();
      user.name = req.body.name;
      
      // Save user in database
      user.save(function (err) {
        if (err)
          next(e500);
        res.json({
            message: 'User created',
            data: user
        });
    });
  } catch (error) {
    next(e500);
  }
};

// Patch existing user by id
exports.updateUser = function (req, res) {
  try {
    // First, get user by id
    User.findById(req.params.id, function (err, user) {
      if (err)
        next(e404);
      // Second, update object's info and save it
      user.name = req.body.name ? req.body.name : user.name;
      user.save(function (err) {
        if (err)
          next(e500);
        res.json({
            message: 'User updated',
            data: user
        });
      });
    });
  } catch (error) {
    next(e500);
  }       
};

// Delete existing user by id
exports.deleteUser = function (req, res) {
  try {
    // Delete user from database
    User.remove({
      _id: req.params.id
    }, function (err, user) {
      if (err)
        next(e404);
      res.json({
        message: 'User deleted',
        data: user
      });
    });
  } catch (error) {
    next(e500);
  }  
};
