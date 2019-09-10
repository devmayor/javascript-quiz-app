const express = require('express');
const todoValidators = require('../app/validators/todo');
const Router = express.Router();
const {authenticate} = require('../app/middlewares/authenticated');
const {responseFormat} = require('../app/validators/responseFormat');
const Todo = require('../app/controllers/todo');

// Route to list all todos created by authenticated user
Router.get('/',authenticate, Todo.get);


// Route to save a new todo
// You need to validation to this field
Router.post('/',authenticate, todoValidators.addTodo , Todo.save);


// Route to complete a todo
Router.post('/todos/complete/:id',authenticate,Todo.complete);

// Route to update a todo
Router.patch('/todos/:id',authenticate,todoValidators.addTodo, responseFormat ,Todo.update);

// Route to delete a todo
Router.delete('/todos/:id',authenticate,Todo.delete);

// Route to create checklist
Router.post('/checklist/:todoId', authenticate , todoValidators.checklist , responseFormat , Todo.checklist);

// Route to edit content of a todo ckecklist 
Router.patch('/checklist/:todoId/:checklistId', authenticate , todoValidators.editChecklist , responseFormat , Todo.checklistUpdate);

module.exports = Router;