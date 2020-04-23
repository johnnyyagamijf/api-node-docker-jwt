const routes = require('express').Router();
const usesController = require('../controllers/UserController');

const validation = require('../authentication/Validation');
const {verifyUserExistis} = require('../middleware/Utils');

routes.post('/login', usesController.login);
routes.get('/',  validation.validToken, usesController.index);
routes.post('/create',  verifyUserExistis, usesController.create);

module.exports = routes;