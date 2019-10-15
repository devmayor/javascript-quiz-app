const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/TodoApp');
mongoose.connect('mongodb://mongo:27017/TodoApp');

module.exports.mongoose = {mongoose};