const { body, check } = require("express-validator/check");
const { Monitor } = require("../../db/models/monitor");
const { User } = require('../../db/models/user');
const { Todo } = require('../../db/models/todo');
const level = ['every','major'];

module.exports.getMonitorByTodo = [
  check("todoId","todo is field is invalid")
  .exists()
  .isMongoId()
  .custom((value, { req }) => {
      return Todo.findOne( { _id: value } ).then(resp => {
        if (!resp) {
          return Promise.reject("This todo doesn't exist");
        }
      })})
]
module.exports.getMonitorByUser = [
  check("userId","user id field is invalid")
  .exists()
  .isMongoId()
  .custom((value, { req }) => {
      return User.findOne( { _id: value } ).then(resp => {
        if (!resp) {
          return Promise.reject("This user doesn't exist");
        }
      })})
]
module.exports.removeMonitor = [
  body("userId","user id field is invalid")
  .exists()
  .isMongoId()
  .custom((value, { req }) => {
      return User.findOne( { _id: value } ).then(resp => {
        if (!resp) {
          return Promise.reject("This user doesn't exist");
        }
      })}),
  body("todoId","todo is field is invalid")
  .exists()
  .isMongoId()
  .custom((value, { req }) => {
      return Todo.findOne( { _id: value } ).then(resp => {
        if (!resp) {
          return Promise.reject("This todo doesn't exist");
        }
      })})
]
module.exports.addMonitor = [
    body("userId","user id field is invalid")
    .exists()
    .isMongoId()
    .custom((value, { req }) => {
        return User.findOne( { _id: value } ).then(resp => {
          if (!resp) {
            return Promise.reject("This user doesn't exist");
          }
        })}),
    body("todoId","todo is field is invalid")
    .exists()
    .isMongoId()
    .custom((value, { req }) => {
        return Todo.findOne( { _id: value } ).then(resp => {
          if (!resp) {
            return Promise.reject("This todo doesn't exist");
          }
        })}),
    body("level","level is invalid")
    .exists()
    .withMessage("this field doesnt exist")
    .custom((value, { req }) => {
        if(!level.includes(value)){
            return Promise.reject("The level option is wrong. ");
        }
        return Promise.resolve();
    })
]