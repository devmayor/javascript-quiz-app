const { body } = require('express-validator/check');
module.exports.register = [
    body('email','Input a correct email address')
    .isEmail()
    .normalizeEmail(),
    body('name','name field is incorrect')
    .trim()
    .isLength({min:1, max: 50})
    .withMessage('name cannot be empty'),
    body('age','Input a valid age which must be a number')
    .isNumeric()
    .withMessage('Age must be a number')
    .isInt(),
    body('location','Input a valid location')
    .isLength({ min: 1 })
    .withMessage('Location cannot be empty'),
    body('password','Input a valid password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('The error length is too short'),
];