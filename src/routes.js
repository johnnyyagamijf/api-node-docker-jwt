const routes = require('express').Router();

const taskRouter = require('../src/routes/task');
const userRouter = require('../src/routes/user');

routes.use(taskRouter);
routes.use(userRouter);


module.exports = routes;