const routes = require('express').Router();
const taskController = require('../controllers/TaskController');
const validation = require('../authentication/Validation');
const {verifyUserExistis} = require('../middleware/Utils');

routes.get('/tasks', validation.validToken, taskController.store);
routes.post('/tasks/', taskController.create);
routes.put('/tasks/:id', taskController.show);
routes.delete('/tasks/:id', taskController.remove);

 module.exports = routes;