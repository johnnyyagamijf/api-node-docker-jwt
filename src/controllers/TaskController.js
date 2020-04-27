const Task = require('../models/Task');
const repository = require('../repositories/task-repository');

 exports.create = async (req, res) => {
    const {title, description} = req.body;
    console.log(req.body);
    try {
      await repository.create({
        title,
        description
      });

    return res.status(201).json({message: 'Task successfully created!'});
    } catch (error) {
      console.log(error)
      res.status(500).send({message: 'Request failed!'})
    }  
  }
  exports.store = async (req, res, next) => {
    const {page} = req.query;
    const tasks = await repository.getListTasks(page);
    return res.status(200).json(tasks);
  };

 exports.show = async (req, res) => {
  const task = await repository.getTaskById(req.params.id);
  return res.status(200).json(task);
  };

  exports.remove = async (req, res) => {
    return res.json({method: 'remove'});
  };

  exports.update = async (req, res) => {
    return res.json({method: 'update'});
  };
