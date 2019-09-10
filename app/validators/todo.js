const { body, check } = require("express-validator/check");
const { Todo } = require("../../db/models/todo");

module.exports.addTodo = [
  body("title", "Title is invalid")
    .exists()
    .isLength({ min: 1, max: 150 }),
  body("description")
    .exists()
    .isLength({ min: 1 })
];
module.exports.checklist = [
  body("checklist")
    .exists()
    .withMessage("checklist doesnt exist")
    .isArray()
    .withMessage("checklist is not an array")
    .isLength({ min: 1 })
    .withMessage("checklist must be more than 0"),
  body("checklist.*.text")
    .exists()
    .withMessage("text is empty")
    .isString()
    .withMessage("text must be a string"),
  body("checklist.*.completed")
    .exists()
    .withMessage("completed must exist")
    .isBoolean(),
  check("todoId")
    .isMongoId()
    .withMessage("id is incorrect")
    .custom((value, { req }) => {
      return Todo.findOne({ _id: value }).then(resp => {
        if (!resp) {
          return Promise.reject("This todo doesn't exist");
        }
      });
    })
];
module.exports.editChecklist = [
  body("text", "text is invalid")
    .exists()
    .isString(),
  body("completed","completed field is invalid or not boolean")
    .exists()
    .isBoolean(),
  check("todoId")
    .isMongoId()
    .withMessage("id is incorrect")
    .custom((value, { req }) => {
      return Todo.findOne({ _id: value }).then(resp => {
        if (!resp) {
          return Promise.reject("This todo doesn't exist");
        }
      });
    }),
  check("checklistId")
    .isMongoId()
    .withMessage("checklist id is incorrect")
    .custom((value, { req }) => {
      return Todo.findOne( { _id: req.params.todoId , "checklist._id" : value} ).then(resp => {
        // console.log("checklist",resp);
        if (!resp) {
          return Promise.reject("This checklist doesn't exist");
        }
      })})
];
