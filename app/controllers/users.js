const {User} = require('../../db/models/user');
const { ObjectID } = require('mongodb');

module.exports.users = (req , res)=>{
    User.find().then((resp)=>{
        res.send(resp);
    },(err)=>{
        res.status(401).send();
    })
    
}

module.exports.me = (req , res)=>{
    res.send(req.user);
}

module.exports.profile = (req , res)=>{
    const params = req.params;
    const id = params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    User.findOne({_id:id}).then((data)=>{
            res.send({data});
        },(error)=>{
            res.status(404).send();
        })
    // User.findById(id).then((data)=>{
    //     res.send({data});
    // },(error)=>{
    //     res.status(404).send();
    // })
}

module.exports.delete = (req , res)=>{
    const id = req.param('id');

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    User.findByIdAndDelete(id).then((data)=>{
        res.send({data});
    },(error)=>{
        res.status(404).send();
    })
}

module.exports.update = (req , res)=>{
    const id = req.param('id');
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }  
    const data = _.pick(req.body , ['name' , 'age' , 'location']);
    User.findByIdAndUpdate(id , {$set : data} ,{new : true}).then((resp)=>{
        res.send(resp);
    }).catch((error)=>{
        res.status(404).send();
    })
}