const User = require('../models/User');
const Task = require('../models/Task');

exports.verifyUserExistis = async (req, res, next) =>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if (user) {
      return res.json({message: 'user already!'})
    }
    next();
  };
  
  exports.verifyTaskExistis = async (req, res, next) => {
    const {title} = req.body;
    const task = await Task.findOne({title});
    if (task) {
      return res.json({message: 'task already!'})
    }
    next();
  };

