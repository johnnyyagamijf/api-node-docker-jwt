const User = require('../models/User');

module.exports = {
  async verifyUserExistis(req, res, next){
    const {email} = req.body;
    const user = await User.findOne({email});
    if (user) {
      return res.json({message: 'user already!'})
    }
    next();
  }
}

async function userExistis(){
  return await User.findOne({email});
}