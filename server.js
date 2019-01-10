const express = require('express');
const {mongoose} = require('./db/mongose');
const {User} = require('./db/models/user');
const {Todo} = require('./db/models/todo');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const {authenticate} = require('./app/middlewares/authenticated');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const _ = require('lodash');
const AuthRoutes = require('./routes/auth');

let app = express();

app.use(bodyParser.json());

app.use('/auth',AuthRoutes);






// app.post('/add',(req , res)=>{
//     const data = req.body;
//     let user = new User({
//         email: data.email,
//         name: data.name,
//         age: data.age,
//         location: data.location,
//         password: data.password
//     });
    

//     user.save().then((resp)=>{
        
//         resp.generateAuthToken().then((token) => {
            
//             res.header('x-auth', token).send(resp);
//           }).catch((e) => {
//             res.status(400).send(e);
//           })
        
//     },(error)=>{
//         res.status(400).send(error);
//     });
// })

app.post('/user/auth',(req , res)=>{
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
        res.status(401).send();
    })
})

app.post('/user/auth/logout',authenticate,(req , res)=>{
    const user = req.user;
    user.logout(req.token).then((resp)=>{
        res.send();
    })
})

app.get('/users',(req , res)=>{
    User.find().then((resp)=>{
        res.send(resp);
    },(err)=>{
        res.status(401).send();
    })
    
})

app.get('/user/me',authenticate,(req , res)=>{
    res.send(req.user);
})


app.get('/user/:id', (req , res)=>{
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
})

app.delete('/user/:id',(req , res)=>{
    const id = req.param('id');

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    User.findByIdAndDelete(id).then((data)=>{
        res.send({data});
    },(error)=>{
        res.status(404).send();
    })
})

app.patch('/user/:id',(req , res)=>{
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
})
app.get('/todos',authenticate,(req , res)=>{
    Todo.find({created_by: req.user._id}).then((todos)=>{
        res.send(todos);
    }).catch((error)=>{
        res.status('400').send();
    })
})
app.post('/todos',authenticate,(req , res)=>{
    const data = _.pick(req.body,['title','description']);
    const created_at = moment().format('YYYY-MM-DD HH:mm:ss');
    const created_by = req.user._id;
    const user = new Todo({...data,created_at,created_by});

    user.save().then((resp)=>{
        res.send(resp);
    }).catch(error=>{
        res.status(400).send(error);
    })
})
app.post('/todos/complete/:id',authenticate,(req , res)=>{
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

})

app.patch('/todos/:id',authenticate,(req , res)=>{
    const data = _.pick(req.body,['title','description']);
    const id = req.param('id');

    const user = Todo.findByIdAndUpdate(id,{$set: data},{new: true}).then((user)=>{
        res.send(user);
    }).catch((error)=>{
        res.status(400).send(error);
    });

    
});

app.delete('/todos/:id',authenticate,(req , res)=>{
    const id = req.param('id');
    const user = Todo.findByIdAndDelete(id).then((user)=>{
        res.send(user);
    }).catch((error)=>{
        res.status(400).send(error);
    });
});
app.post('/checklist/:todoId',authenticate,(req , res)=>{
    
})
app.listen(3000,(resp)=>{
    console.log("server running")
})