const mongoose = require('mongoose');
const User = require('../models/User');

exports.create = async(data) => {
  var user = new User(data);
  await user.save();
}

exports.getUserById = async(id) => {
  return await User.findById(id);;
}

exports.getListUsers = async() => {
  return await User.find();
}

