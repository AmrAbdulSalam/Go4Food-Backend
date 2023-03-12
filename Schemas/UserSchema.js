const mongoose = require('mongoose')
const Schema = mongoose.Schema


let userSchema = new Schema({
    firstname : {
        type : String ,
        required : true
    } ,
    lastname : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true
    },
    phoneNumber : {
        type : String ,
        required : true
    },
    country : {
        type : String ,
        required : true
    },
    password : {
        type : String ,
        required : true
    },
    registerDate : Date
})

const UserSchema = mongoose.model("userinformation" , userSchema)
module.exports = UserSchema


