const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    quiz: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    options:  [
        {
          _id: false,
          optionValue: {
            type: String,
          },
          optionDisplayValue: {
            type: String,
          }
        },
      ],
    questionType: {
        type: {
            notification_level: {
                type: String,
                enum: ['every','major'],
                default: 'major'
            }
        }
    }
});

module.exports = {QuestionSchema};