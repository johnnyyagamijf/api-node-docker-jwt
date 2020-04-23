const validation = require('../authentication/Validation');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt')

module.exports.login  = async (req, res) =>{
    const {email, password} = req.body;
    const userDB = await User.findOne({email});
  
    if(userDB){
        const match = await bcrypt.compare(password, userDB.password);
        if(match)
          return res.json({token: validation.createToken(userDB)});
}

return res.status(400).json({message: 'User not found'});
}

module.exports.index  = (req, res, next) =>{
    return res.json(Users);
};

module.exports.create  = async (req, res) =>{
      const rounds = 10
    
    bcrypt.hash(req.body.password, rounds, (err, hash) => {
        if (err) {
        return res.status(400).json({erro: err});
      }
      let user = User.create({
        email: req.body.email,
        password: hash
    });      
    });
 
    return res.status(201).json({message: 'User successfully created!'});
};