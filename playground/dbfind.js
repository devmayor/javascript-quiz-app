// using es6 obj decontruction
const { MongoClient , ObjectID} = require('mongodb');
const url = 'mongodb://localhost:27017';
MongoClient.connect(url,{ useNewUrlParser: true }).then((client)=>{
    const db = client.db('TodoApp');

    db.collection('users').find({location : 'Lagos'}).toArray().then((result)=>{
        console.log(result);
    },(error)=>{
        console.logs('Error  when finding',error);
    })

    client.close();
}).catch((error)=>{
    console.log('Unable to connect',error);
})