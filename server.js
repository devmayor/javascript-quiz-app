const express = require('express');
const {mongoose} = require('./db/mongose');
const bodyParser = require('body-parser');

const AuthRoutes = require('./routes/auth');
const TodoRoutes = require('./routes/todo');

let app = express();

app.use(bodyParser.json());

app.use('/auth', AuthRoutes);

app.use('/todos', TodoRoutes);

app.listen(3000,(resp)=>{
    console.log("server running")
})