const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        maxlength: 300,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    checklist: {[]},
    completed_at:{
        type: Number, 
        required: false
    },
    _created_by:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});


module.exports = {TodoSchema};
