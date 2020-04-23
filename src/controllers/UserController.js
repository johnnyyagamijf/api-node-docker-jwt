const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const validation = require('../authentication/Validation');
const User = require('../models/User');

exports.login  = async (req, res) =>{
  const {email, password} = req.body;
  const userDB = await User.findOne({email});
  
  if(userDB){
    const match = await bcrypt.compare(password, userDB.password);
    if(match)
      return res.json({token: validation.createToken(userDB)});
}

  return res.status(400).json({message: 'User not found'});
}

exports.index  = (req, res, next) =>{
  return res.json(Users);
};

exports.create = async (req, res) =>{
  const rounds = 10
    
  bcrypt.hash(req.body.password, rounds, (err, hash) => {
    if (err) {
      return res.status(400).json({erro: err});
    }
    User.create({
      email: req.body.email,
      password: hash,
      // todo usuário será cadastrado como user mesmo, caso seja necessário
      // elevar a permissão, somente acessando dierto o banco de dados.
      roles:["user"]
    });      
    });
 
  return res.status(201).json({message: 'User successfully created!'});
};