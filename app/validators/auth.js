const { body } = require('express-validator/check');
const {User} = require('../../db/models/user');
module.exports.register = [
    body('email')
    .custom((value)=>{
        // return User.findOne({'email':value}).then((resp)=>{
        //     if(resp){
        //         return Promise.reject("This user exists already");
        //     }
        // });
        // if (alreadyHaveEmail(email)) {
            return Promise.reject("This user exists already");
        //   }
    })
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