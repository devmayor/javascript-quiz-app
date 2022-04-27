const mongoose = require('mongoose');

// would be saved in a n env file
const connectionString = process.env.db;
mongoose.Promise = global.Promise;
mongoose.connect(connectionString);

module.exports.mongoose = {mongoose};