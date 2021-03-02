// Local dependencies
const { e404, e500 } = require('../constants/Errors');
User = require('../models/userModel');

// Get list of users
exports.getUsers = async (req, res, next) => {
  try {
    // Request users from database
    const users = await User.find().exec();
    // If found, return them
    res.json({
      message: "Users retrieved",
      data: users
    });
  } catch (err) {
    // If not, log error and return it
    console.log(JSON.stringify(err));
    next(e500);
  }   
};

// Get user by id
exports.getUserById = async (req, res, next) => {
  try {
    // Request user from database
    const user = await User.findById(req.params.id).exec();
    // If not found, return not found error
    if (!user)
      next(e404);
    // If found, return it
    res.json({
      message: "User retrieved",
      data: user
    });
  } catch (err) {
    // If not, log error and return it
    console.log(JSON.stringify(err));
    next(e500);
  }  
};

// Post new user generating id
exports.createUser = async (req, res, next) => {
  try {
    // Create user and load its data
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    // Save user in database
    const saved_user = await user.save();
    res.json({
        message: 'User created',
        data: saved_user
    });
  } catch (error) {
    // If not, log error and return it
    console.log(JSON.stringify(error));
    next(e500);
  }
};

// Patch existing user by id
exports.updateUser = async (req, res, next) => {
  try {
    // Request user from database
    const user = await User.findById(req.params.id).exec();
    // If not found, return not found error
    if (!user)
      next(e404);
    // If found, update user's info
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email ? req.body.email : user.email;
    user.password = req.body.password ? req.body.password : user.password;
    // Then, save updated user in database
    const saved_user = await user.save();
    res.json({
        message: 'User updated',
        data: saved_user
    });
  } catch (error) {
    // If not, log error and return it
    console.log(JSON.stringify(error));
    next(e500);
  }       
};

// Delete existing user by id
exports.deleteUser = async (req, res, next) => {
  try {
    // Try to delete user from database
    const user = await User.remove({_id: req.params.id}).exec();
    // If not found, return not found error
    if (!user.deletedCount)
      next(e404);
    // If found and deleted, return it
    res.json({
      message: 'User deleted',
      data: user
    });
  } catch (error) {
    // If not, log error and return it
    console.log(JSON.stringify(error));
    next(e500);
  }  
};
