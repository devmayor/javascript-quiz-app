const { body, validationResult } = require("express-validator/check");
const { User } = require("../../db/models/user");
module.exports.register = [
  body("email", "Your email is not correct")
    .exists()
    .isEmail()
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(resp => {
        if (resp) {
          return Promise.reject("This user exists already");
        }
      });
    }),
  body("name", "name field is incorrect")
    .exists()
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be between 1 and 50 characters")
    .isAlphanumeric()
    .withMessage("Name must contain only letters and numbers")
    .trim(),
  body("age", "Input a valid age which must be a number")
    .isNumeric()
    .withMessage("Age must be a number")
    .isInt(),
  body("location", "Input a valid location")
    .isLength({ min: 1 })
    .withMessage("Location cannot be empty"),
  body("password", "Input a valid password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("The error length is too short")
];

module.exports.login = [
  body("email")
    .exists()
    .isEmail()
    .not()
    .isEmpty(),
  body("password")
    .exists()
    .not()
    .isEmpty()
];

module.exports.updateProfile = [
  body("name", "this field is incorrect")
    .isLength({ min: 1, max: 50 })
    .withMessage("Name must be between 1 and 50 characters")
    .isAlphanumeric()
    .withMessage("Name must contain only letters and numbers")
    .trim(),
  body("age", "age field is incorrect")
    .isNumeric()
    .withMessage("Age must be a number")
    .isInt(),
  body("location","location field is incorrect")
  .isLength({ min: 1 })
  .withMessage("Location cannot be empty"),
];
