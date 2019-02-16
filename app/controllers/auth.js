const {User} = require('../../db/models/user');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
//function to register a new user
module.exports.register = (req , res)=>{
    const data = req.body;
    let user = new User({
        email: data.email,
        name: data.name,
        age: data.age,
        location: data.location,
        password: data.password
    });
    

    user.save().then((resp)=>{
        
        resp.generateAuthToken().then((token) => {
            
            res.header('x-auth', token).send(resp);
          }).catch((e) => {
            res.status(400).send(e);
          })
        
    },(error)=>{
        res.status(400).send(error);
    });
}

// login function
module.exports.login = (req , res)=>{
    
    const data = _.pick(req.body,['email','password']);
    
    const users = User.findOne({email: data.email}).then((resp)=>{
        return bcrypt.compare(data.password,resp.password);
    }).then((result)=>{
        
        if(!result){
            return Promise.reject();
        }
        return new Promise((resolve , reject)=>{
            User.findOne({email: data.email}).then((user)=>{
                resolve(user.generateAuthToken());
            }).catch((error)=>{
                reject(error);
            })
        }) 
    }).then((token)=>{
        res.setHeader('x-auth',token);
        res.send();
    }).catch((error)=>{
        console.log(error);
        res.status(401).send();
    })
}

// logout function
module.exports.logout = (req , res)=>{
    const user = req.user;
    user.logout(req.token).then((resp)=>{
        res.send();
    })
}