const mongoose = require('mongoose');
const {userSchema} = require('../schemas/user');

let User = mongoose.model('User',userSchema);

module.exports = {User};