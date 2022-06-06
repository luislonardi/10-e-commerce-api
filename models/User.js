const mongoose = require('mongoose'); 
//We are using the mongoose validator and the express validator package
const validator=require('validator')
//for hashing the password use bcrypt library
const bcrypt= require('bcryptjs')

// Declare the Schema of the Mongo model
var UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minlength:3,
        maxlength: 50,
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Please provide an email'],
        validate:{
            message: 'Please provide valid email',
            validator: validator.isEmail,
        }    
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minlength:6,
    },

    role:{
        type:String,
        enum:['admin', 'user','owner'],
        default: 'user',
    }

});

//use pre mongoose middleware
UserSchema.pre('save',async function(){
    console.log('hello there')
const salt= await bcrypt.genSalt(10);
this.password= await bcrypt.hash(this.password,salt);
})

//use to compare the password

UserSchema.methods.comparePassword= async function(candidatePassword){
    const isMatch= await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
}

//Export the model
module.exports = mongoose.model('User', UserSchema);