const express = require('express');
const todoValidators = require('../app/validators/todo');
const Router = express.Router();
const {authenticate} = require('../app/middlewares/authenticated');
const Todo = require('../app/controllers/todo');

// Route to list all todos created by authenticated user
Router.get('/',authenticate, Todo.get);


// Route to save a new todo
// You need to validation to this field
Router.post('/',authenticate,Todo.save);


// Route to complete a todo
Router.post('/todos/complete/:id',authenticate,Todo.complete);

// Route to update a todo
Router.patch('/todos/:id',authenticate,Todo.update);

// Route to delete a todo
Router.delete('/todos/:id',authenticate,Todo.delete);

// Route to create checklist
Router.post('/checklist/:todoId',authenticate,Todo.createChecklist);


module.exports = Router;
