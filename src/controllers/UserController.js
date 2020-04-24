const jwt = require("jsonwebtoken");
const md5 = require('md5');

const authService = require('../services/auth');
const User = require("../models/User");
const repository = require("../repositories/user-repository");

exports.login = async(req, res, next) => {
  try {
      const userDB = await repository.authenticate({
          email: req.body.email,
          password: md5(req.body.password + process.env.SECRET_KEY)
      });

      if (!userDB) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const token = await authService.createToken({
          id: userDB._id,
          email: userDB.email,
          name: userDB.name,
          roles: userDB.roles
      });
      return res.status(201).json({token});
  } catch (e) {
      res.status(500).send({
          message: 'Request fail'
      });
  }
};

exports.store = async (req, res, next) => {
  const users = await repository.getListUsers();
  return res.status(200).json(users);
};

exports.create = async (req, res) => {
  const rounds = 10;

  try {
    
      await repository.create({
        email: req.body.email,
        password: md5(req.body.password + process.env.SECRET_KEY),
        // todo usuário será cadastrado como user mesmo, caso seja necessário
        // elevar a permissão, somente acessando dierto o banco de dados.
        roles: ["user"],
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
