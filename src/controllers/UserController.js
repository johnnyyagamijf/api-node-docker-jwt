const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authService = require('../services/auth');
const User = require("../models/User");
const repository = require("../repositories/user-repository");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userDB = await User.findOne({ email });

  if (userDB) {
    const match = await bcrypt.compare(password, userDB.password);
    if (match){
      return res.status(201).json({ 
        token: authService.createToken(userDB) });
    } 
    
  }
  return res.status(400).json({ message: "User not found" });
};

exports.store = async (req, res, next) => {
  const users = await repository.getListUsers();
  return res.status(200).json(users);
};

exports.create = async (req, res) => {
  const rounds = 10;

  try {
    bcrypt.hash(req.body.password, rounds, (err, hash) => {
      if (err) {
        return res.status(400).json({ erro: err });
      }
      repository.create({
        email: req.body.email,
        password: hash,
        // todo usuário será cadastrado como user mesmo, caso seja necessário
        // elevar a permissão, somente acessando dierto o banco de dados.
        roles: ["user"],
      });
    });

    return res.status(201).json({ message: "User successfully created!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Request failed!" });
  }
};

exports.show = async (req, res) => {
  const user = await repository.getUserById(req.params.id);
  return res.status(200).json(user);
  };
