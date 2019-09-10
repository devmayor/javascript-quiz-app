const mongoose = require('mongoose');
const {ChecklistSchema} = require('../schemas/checklist');
const moment = require('moment');
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
        maxlength: 1500,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    checklist: {
        type: [ChecklistSchema],
        required: false,
        default: []
    },
    completed_at:{
        type: String,
        required: false
    },
    created_at:{
        type: String,
        required: true,
        default: false
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

TodoSchema.methods.complete = function (completed) {
    const todo = this;
    let completed_at;
    
    if(completed){
        completed_at  = moment().format('YYYY-MM-DD HH:mm:ss')
    }else{
        completed_at  = null;
    }
    const data = {completed , completed_at};
    return new Promise((resolve , reject)=>{
        todo.update({$set: data},{new: true}).then((user)=>{
           resolve(user);
        }).catch((error)=>{
            reject(error);
        });
    
    })
}
module.exports = {TodoSchema};