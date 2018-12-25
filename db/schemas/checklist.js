const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChecklistSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = {ChecklistSchema};