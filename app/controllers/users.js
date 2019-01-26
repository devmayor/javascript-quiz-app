const {User} = require('../../db/models/user');

module.exports.users = (req , res)=>{
    User.find().then((resp)=>{
        res.send(resp);
    },(err)=>{
        res.status(401).send();
    })
    
}