const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MonitorSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    todoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    setting: {
        type: {
            notification_level: {
                type: String,
                enum: ['every','major'],
                default: 'major'
            }
        }
    }
});

module.exports.MonitorSchema = MonitorSchema;