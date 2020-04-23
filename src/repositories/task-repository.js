const mongoose = require('mongoose');
const Task = require('../models/Task');

exports.create = async(data) => {
  var product = new Task(data);
  await product.save();
}

exports.showDataTask = async(id) => {
  const task = await Task.findById(id);
  console.log('meu id está aqui', task);
  return task;
}

