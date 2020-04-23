const User = require('../models/User');
const Task = require('../models/Task');

module.exports = {
  async verifyUserExistis(req, res, next){
    const {email} = req.body;
    const user = await User.findOne({email});
    if (user) {
      return res.json({message: 'user already!'})
    }
    next();
  },
  async verifyTaskExistis(req, res, next){
    const {title} = req.body;
    const task = await Task.findOne({title});
    if (task) {
      return res.json({message: 'task already!'})
    }
    next();
  }
}
