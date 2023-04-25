const mongoose = require('mongoose')
let Schema = mongoose.Schema;


let productSchema = new Schema({
    category : {
        type : String ,
        required : true
    },
    title : {
        type : String ,
        required : true
    },
    //Resturant Name
    resName : {
        type : String ,
        required : true
    } ,
    boxNo : {
        type : Number ,
        min : 1 ,
        max : 5 ,
        default : 5 ,
        required : true
    } ,
    price : {
        oldPrice : {
            type : Number ,
            required : true
        } ,
        newPrice : {
            type : Number ,
            required : true
        }
        
    } ,
    timeToCollect : {
        type : String ,
        required : true ,
    },
    location : {
        type : [] ,
        required : true
    } ,
    description : {
        type : String ,
        default : "Welcme to our resturant hope you will join the our food"
    } ,
    available : {
        type : Boolean ,
        default : true ,
        required : true
    } ,
    picture : {
        url : {
            type : String ,
            required : true
        },
        picTitle : {
            type : String ,
            default : "no-name image"
        } ,
    } , 
    dateOfAnnouncment : {
        type : Date ,
        default : Date.now
    } , 
    avgRating : {
        type : Schema.Types.Number ,
        default : 0.0
    } ,
    ratingUsers : [{
        userId : { 
            type : mongoose.Schema.Types.ObjectId , 
            ref : 'userId'  ,
            required : true
        } ,
        rating : {
            type : Number ,
            min : 0 ,
            max : 5 ,
            require : true
        } ,
        createdAt: { 
            type: Date , 
            default: Date.now 
        }
    }]

})

const ProductSchema = mongoose.model('product' , productSchema);
module.exports = ProductSchema

