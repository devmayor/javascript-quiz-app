const {Todo} = require('../../db/models/todo');
const { ObjectID } = require('mongodb');
const moment = require('moment');
const _ = require('lodash');

module.exports.get = (req , res)=>{
    Todo.find({created_by: req.user._id}).then((todos)=>{
        res.send(todos);
    }).catch((error)=>{
        res.status('400').send();
    })
}

module.exports.save = (req , res)=>{
    const data = _.pick(req.body,['title','description']);
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const created_by = req.user._id;
    const user = new Todo({...data,created_at,created_by});

    user.save().then((resp)=>{
        res.send(resp);
    }).catch(error=>{
        res.status(400).send(error);
    })
};

module.exports.complete = (req , res)=>{
    const data = _.pick(req.body,['completed']);
    const id = req.param('id');
    const user = Todo.findById(id).then((user)=>{
        return user.complete(data.completed);
        
    }).then((resp)=>{
        res.send(resp);
    }).catch((error)=>{
        console.log(error);
        res.status(400).send(error);
    });

}


module.exports.update = (req , res)=>{
    const data = _.pick(req.body,['title','description']);
    const id = req.param('id');

    const user = Todo.findByIdAndUpdate(id,{$set: data},{new: true}).then((user)=>{
        res.send(user);
    }).catch((error)=>{
        res.status(400).send(error);
    });

    
}

module.exports.delete = (req , res)=>{
    const id = req.param('id');
    const user = Todo.findByIdAndDelete(id).then((user)=>{
        res.send(user);
    }).catch((error)=>{
        res.status(400).send(error);
    });
}

module.exports.checklist = (req , res)=>{
    return res.send('ddd');
}