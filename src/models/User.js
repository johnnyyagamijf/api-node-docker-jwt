const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email:{
    type:String,
    require: true
  },
  password:{
    type: String,
    require: true,
  },
  roles: [{
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
}]
});

module.exports = mongoose.model('User', userSchema);