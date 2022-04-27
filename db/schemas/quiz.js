const mongoose = require('mongoose');
const { QuestionSchema } = require('../schemas/questions');
const { SubmissionsSchema } = require('../schemas/submissions');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
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
    submissions: {
        type: [SubmissionsSchema],
        required: false,
        default: []
    },
    questions: {
        type: [QuestionSchema],
        required: true,
        default: []
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

// TodoSchema.methods.complete = function (completed) {
//     const todo = this;
//     let completed_at;
    
//     if(completed){
//         completed_at  = moment().format('YYYY-MM-DD HH:mm:ss')
//     }else{
//         completed_at  = null;
//     }
//     const data = {completed , completed_at};
//     return new Promise((resolve , reject)=>{
//         todo.update({$set: data},{new: true}).then((user)=>{
//            resolve(user);
//         }).catch((error)=>{
//             reject(error);
//         });
    
//     })
// }
module.exports = {QuizSchema};