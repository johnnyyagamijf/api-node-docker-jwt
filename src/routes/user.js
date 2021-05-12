const routes = require('express').Router();
const usesController = require('../controllers/UserController');
const {verifyUserExistis} = require('../middleware/Utils');
const authService = require('../services/auth');

routes.post('/login', usesController.login);

routes.get('/users',  usesController.store);
routes.get('/users/:id',  authService.isAdministrator, usesController.show);
routes.post('/users', verifyUserExistis, usesController.create);

module.exports = routes;