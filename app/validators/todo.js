const { body } = require('express-validator/check');
const {Todo} = require('../../db/models/todo');

module.exports.createChecklist = [
    body('checklist').custom((value, {req, loc, path}) => {
        return false;
    }).withMessage("Passwords don't match.")
]