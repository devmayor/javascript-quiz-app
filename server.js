const express = require('express');
const {mongoose} = require('./db/mongose');
const bodyParser = require('body-parser');

const AuthRoutes = require('./routes/auth');
const TodoRoutes = require('./routes/todo');
const MonitorRoutes = require('./routes/monitor');

// register events
const {Event} = require('./app/classes/events');


let app = express();

app.use(bodyParser.json());

app.use('/auth', AuthRoutes);

app.use('/todos', TodoRoutes);

app.use('/monitor' , MonitorRoutes);

// create an api for managing errors for api calls thats are never found

app.listen(3000,(resp)=>{
    console.log("server running")
})