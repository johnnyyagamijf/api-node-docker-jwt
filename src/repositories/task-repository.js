const mongoose = require('mongoose');
const Task = require('../models/Task');

exports.create = async(data) => {
  var task = new Task(data);
  await task.save();
}

exports.getTaskById = async(id) => {
  return await Task.findById(id);;
}

exports.getListTasks = async() => {
  return await Task.find();
}

