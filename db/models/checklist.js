const mongoose = require('mongoose');
const {ChecklistSchema} = require('../schemas/checklist');

let Checklist = mongoose.model('Checklist',ChecklistSchema);

module.exports = {Checklist};