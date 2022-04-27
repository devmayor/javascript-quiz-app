const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubmissionsSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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

module.exports = {SubmissionsSchema};