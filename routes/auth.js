const express = require('express');
const auth = require('../app/controllers/auth');
const users = require('../app/controllers/users');
const authValidators = require('../app/validators/auth');
const Router = express.Router();
const {authenticate} = require('../app/middlewares/authenticated');
// Route to register new user
Router.post('/register',authValidators.register,auth.register);

// Route to login user
Router.post('/login', authValidators.login ,auth.login);

// Route logout
Router.post('/logout',authenticate, auth.logout);

// Route to view all users. Users need to be authenticated
Router.get('/users',authenticate, users.users);

// Route to get authenticated user account
Router.get('/user/me',authenticate, users.me);

// Route to get user profile
Router.get('/user/:id', users.profile);

// Route to delete a user
Router.delete('/user/:id', authenticate ,users.delete);

// Route to update a user profile
Router.patch('/user/:id',authenticate ,users.update);



module.exports = Router;