const jwt = require('jsonwebtoken');
const express = require('express');

const TaskModel = require('./models/TaskModel');

const router = express.Router();

// MIDDLEWARE
isLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send('Invalid credentials');
  } else {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(403).send('Invalid credentials');
      } else {
        next();
      }
    })
  }
};

// ROUTER ENDPOINTS
router.post('/login', (req, res) => {
  if (req.body.password === process.env.PASSWORD) {
    const token = jwt.sign({
      userId: 1,
    }, process.env.SECRET);
    res.json({
      token,
    });
  } else {
    res.status(401).send('Incorrect password');
  }
});

router.get('/tasks/:filter', isLoggedIn, async (req, res) => {
  const {filter} = req.params;
  if(filter === "all") {
    const tasks = await TaskModel.find();
    console.log(tasks);
    res.json(tasks);
  } else {
    const tasks = await TaskModel.find({completed: filter === "completed"});
    console.log(tasks);
    res.json(tasks);
  }
});

router.post('/createTask', isLoggedIn, async (req, res) => {
  const {text} = req.body;
  const task = new TaskModel({
    text,
    completed: false,
  });
  const newTask = await task.save();
  res.json(newTask);
});

router.put('/updateTask/:id', isLoggedIn, async (req, res) => {
  const {id} = req.params;
  const task = await TaskModel.findById(id);
  task.completed = req.body.completed;
  task.text = req.body.text;
  newTask = await task.save();
  res.json(newTask);
});

router.delete('/deleteTask/:id', isLoggedIn, async (req, res) => {
  const {id} = req.params;
  const task = await TaskModel.findById(id);
  deletedTask = await task.remove();
  res.status(204).json(deletedTask);
});

module.exports = router;