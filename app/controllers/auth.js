const {User} = require('../../db/models/user');

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