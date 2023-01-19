const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  completed: {
    type: Boolean,
  }
});

const TaskModel = mongoose.model('task', taskSchema);

module.exports = TaskModel;