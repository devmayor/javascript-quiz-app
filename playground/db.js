const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true },(error , client)=>{
    if(error){
        return console.log('Unable to connect');
    }

    const db = client.db('TodoApp');
    console.log("we are good");
    // db.collection('todo').insertOne({
    //     msg : 'My first msg',
    //     completed : false
    // },(error , result)=>{
    //     if(error){
    //         return console.log('Error adding value',error);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // })

    db.collection('users').insertOne({
        name : 'Adejobi',
        age : 80,
        location : 'Lagos'
    },(error,result)=>{
        if(error){
            console.log("Error occured",error);
        }
        console.log(result.ops)
    });
    client.close();
})