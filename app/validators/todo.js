const { body , check} = require('express-validator/check');
const {Todo} = require('../../db/models/todo');

module.exports.checklist = [
    body('checklist')
    .exists()
    .withMessage("checklist doesnt exist")
    .isArray()
    .withMessage("checklist is not an array")
    .isLength({ min: 1 })
    .withMessage("checklist must be more than 0"),
    body('checklist.*.text')
    .exists()
    .withMessage("text is empty")
    .isString()
    .withMessage("text must be a string"),
    body('checklist.*.completed')
    .exists()
    .withMessage("completed must exist")
    .isString()
    .withMessage("completed must be a string")
]