const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
let Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        index: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }    
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
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
//an event binder for whenever a save event wants to occur to ceate a new bcrypt 
userSchema.pre('save',function(next){
    const user = this;
    const password = user.password;
    if(user.isModified('password')){
        bcrypt.genSalt(10).then((salt)=>{
            return bcrypt.hash(password,salt);
        }).then((hash)=>{
            user.password = hash;
            next();
        });
    }else{
        next();
    }
    
})

// this function helps to filter the information that outputs whenever a document is sent via json
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    // console.log("user",user);
    // return _.pick(userObject,['name','email','age','location']);
    return _.omit(userObject , ['password','tokens']);
}

userSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    // ajaorush here is our secret key 
    const token = jwt.sign({_id: user._id.toHexString(), access} , 'ajaorush').toString();

    user.tokens = user.tokens.concat([{access , token}]);
    
    return user.save().then(()=>{
        
        return token;
    }).catch((error)=>console.log(error));
}
userSchema.methods.logout = function(token){
    const user = this;
    
    return user.update({
        $pull: {
            tokens: {token}
          }
    })
}
userSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;
    try {
        decoded = jwt.verify(token , 'ajaorush' );
    } catch (error) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.access': 'auth',
        'tokens.token': token
    })
    

}



module.exports = {userSchema};