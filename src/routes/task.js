const routes = require('express').Router();
const taskController = require('../controllers/TaskController');
const validation = require('../authentication/Validation');
const {verifyTaskExistis} = require('../middleware/Utils');
const authService = require('../services/auth');

routes.get('/tasks', authService.isAdministrator, taskController.store);
routes.post('/tasks/', validation.validToken, taskController.create);
routes.get('/tasks/:id', validation.validToken, verifyTaskExistis, taskController.show);
routes.put('/tasks/:id', validation.validToken, verifyTaskExistis, taskController.update);
routes.delete('/tasks/:id', validation.validToken, verifyTaskExistis,taskController.remove);

 module.exports = routes;