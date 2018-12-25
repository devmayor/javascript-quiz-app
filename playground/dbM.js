const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TodoApp');

let Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type :String,
        required: true,
        trim: true
    },
    age  : {
        type: Number,
        required: true,
        min: 18,
        max: 45
    },
    location: {
        type: String,
        default: 'Lagos'
    }
});

let User = mongoose.model('User',userSchema);

let mayowa = new User({
    name: 'Joke jago',
    age: 129,
    
});

mayowa.save().then(resp=>{
    console.log('Saved completely');
    console.log(resp);
}).catch(error=>{
    console.log(error);
})

