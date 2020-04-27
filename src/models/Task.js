const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const taskSchema = new mongoose.Schema({
  title:{
    type: String,
    require: true
  },
  description:{
    type: String,
    require: true
  }
});
taskSchema.plugin(mongoosePaginate);
const Task = mongoose.model('Task', taskSchema);
Task.paginate();
module.exports = Task;