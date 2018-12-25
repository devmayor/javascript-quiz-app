const mongoose = require('mongoose');
const {TodoSchema} = require('../schemas/todo');

const Todo = new mongoose.model('Todo',TodoSchema);

module.exports = {Todo};