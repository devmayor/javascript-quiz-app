const express = require('express');
const auth = require('../app/controllers/auth');
const authValidators = require('../app/validators/auth');
const Router = express.Router();

// Route to register new user
Router.post('/register',authValidators.register,auth.register);

// Route to login user
Router.post('/user/auth', authValidators.login ,auth.login)


module.exports = Router;