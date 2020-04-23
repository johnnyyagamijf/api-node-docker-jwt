const mongoose = require('mongoose');
const Task = require('../models/Task');

exports.create = async(data) => {
  var product = new Task(data);
  await product.save();
}