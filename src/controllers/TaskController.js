const Task = require('../models/Task');
const repository = require('../repositories/task-repository');
module.exports = {
  async create(req, res){
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
  },
  async store(req, res){
    const tasks = await Task.find();
    return res.json(tasks);
  },
  show(req, res){
    return res.json({method: 'show'});
  },
  remove(req, res){
    return res.json({method: 'remove'});
  }
}