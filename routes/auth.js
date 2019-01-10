const express = require('express');
const auth = require('../app/controllers/auth');
const authValidators = require('../app/validators/auth');
const Router = express.Router();

Router.post('/register',authValidators.register,auth.register);


module.exports = Router;