const routes = require('express').Router();
const taskController = require('../controllers/TaskController');
const validation = require('../authentication/Validation');
const {verifyTaskExistis} = require('../middleware/Utils');

routes.get('/tasks', validation.validToken, taskController.store);
routes.post('/tasks/', validation.validToken, taskController.create);
routes.get('/tasks/:id', validation.validToken, verifyTaskExistis, taskController.show);
//routes.put('/tasks/:id', validation.validToken, verifyTaskExistis, taskController.show);
routes.delete('/tasks/:id', validation.validToken, verifyTaskExistis,taskController.remove);

 module.exports = routes;