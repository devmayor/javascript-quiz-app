const { Monitor } = require("../../db/models/monitor");
const { ObjectID } = require("mongodb");
const _ = require("lodash");
const {Event} = require('../classes/events');

module.exports.removeMonitor = (req, res) => {
  const userId = req.body.userId;
  const todoId = req.body.todoId;

  Monitor.deleteOne({ userId , todoId}).then((success)=>{
      res.send(success);
  }).catch((error)=>{
      console.log(error);
      res.status(400).send();
  });
};
module.exports.addMonitor = (req, res) => {
  const data = _.pick(req.body, ["todoId", "userId", "level"]);
  const userId = req.body.userId;
  const todoId = req.body.todoId;

  Monitor.findOne({ userId , todoId}).then((success)=>{
    if(!success){
        const newMonitor = new Monitor({
            userId: data.userId,
            todoId: data.todoId,
            setting: {
              notification_level: data.level
            }
          });
          newMonitor
            .save()
            .then(success => {
              res.send(success);
            })
            .catch(error => {
              console.log(error);
              res.status(400).send(error);
            });
    }else{
        res.json({info:"this record already exists"}).send();
    }
  }).catch(error => {
    console.log(error);
    res.status(400).send(error);
  });
  
};

module.exports.getMonitor = (req , res)=>{
    Event.emit('newuser',{'hello':"Hii"});
    console.log("obj called")
    const userId = req.params.userId;
    const todoId = req.params.todoId;
    const id = req.params.id;
    let query;
    if(userId){
        query = {userId};
    }
    if(todoId){
        query = {todoId};
    }
    if(id){
        query = {_id:ObjectID(id)};
    }

    Monitor.find(query).then((response)=>{
        res.send(response);
    }).catch((error)=>{
        console.log(error);
        res.status(400).send();
    });
  
}
