const routes = require('express').Router();
const taskController = require('../controllers/TaskController');
const authService = require('../services/auth');
const {verifyTaskExistis} = require('../middleware/Utils');

routes.get('/tasks', taskController.store);
routes.post('/tasks/', authService.authorize, taskController.create);
routes.get('/tasks/:id', authService.authorize, verifyTaskExistis, taskController.show);
routes.put('/tasks/:id', authService.authorize, verifyTaskExistis, taskController.update);
routes.delete('/tasks/:id', authService.authorize, verifyTaskExistis,taskController.remove);

 module.exports = routes;