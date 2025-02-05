// resolvers/userResolver.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Assuming you're using Mongoose

// Resolver for Signin mutation
const signin = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
};

// Resolver for Signup mutation
const signup = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email is already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();

  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    token,
  };
};

// Resolver for getting user by ID
const getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

module.exports = {
  signin,
  signup,
  getUser,
};
