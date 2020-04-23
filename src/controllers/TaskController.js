const Task = require('../models/Task');
const repository = require('../repositories/task-repository');

module.exports.create = async (req, res) => {
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
  module.exports.store = async (req, res) => {
    const tasks = await repository.showDataTask(req.params.id);
    return res.json(tasks);
  };

 module.exports.show = async (req, res) => {
  const task = await repository.showDataTask(req.params.id);
  return res.status(200).json(task);
  };

  module.exports.remove = async (req, res) => {
    return res.json({method: 'remove'});
  };
