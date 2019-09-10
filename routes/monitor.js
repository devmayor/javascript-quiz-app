const express = require('express');
const MonitorValidator = require('../app/validators/monitor');
const {authenticate} = require('../app/middlewares/authenticated');
const {responseFormat} = require('../app/validators/responseFormat');
const MonitorController = require('../app/controllers/monitor');
const Router = express.Router();

// Route to add a new user as monitor to a todo
Router.post('/addMonitor', authenticate , MonitorValidator.addMonitor  , responseFormat , MonitorController.addMonitor);

// Remove a user as a monitor to a todo
Router.post('/removeMonitor', authenticate , MonitorValidator.removeMonitor  , responseFormat , MonitorController.removeMonitor);

// Get all todo monitors by todo
Router.get('/todo/:todoId', authenticate , MonitorValidator.getMonitorByTodo  , responseFormat , MonitorController.getMonitor);

// Get all todo monitors by user
Router.get('/user/:userId', authenticate , MonitorValidator.getMonitorByUser  , responseFormat , MonitorController.getMonitor);

// Get all monitor by id
Router.get('/:id', authenticate , MonitorController.getMonitor);



module.exports = Router;