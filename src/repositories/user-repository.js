const mongoose = require('mongoose');
const User = require('../models/User');

exports.create = async(data) => {
  var user = new User(data);
  await user.save();
}

exports.authenticate = async(data) => {
  const user = await User.findOne({
      email: data.email,
      password: data.password
  });
  return user;
}

exports.getUserById = async(id) => {
  return await User.findById(id);;
}

exports.getListUsers = async() => {
  return await User.find();
}

