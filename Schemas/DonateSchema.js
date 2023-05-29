const moongose = require('mongoose')
let Schema = moongose.Schema;



let donateSchema = new Schema({
    email : {
        type : String ,
        required : true
    } ,
    orgName : {
        type : String ,
        required : true
    } ,
    productId : {
        type : moongose.Schema.Types.ObjectId ,
        required : true
    } ,
    price : {
        type : Number ,
        required : true
    } ,
    totalPrice : {
        type : Number ,
        required : true
    } ,
    quantity : {
        type : Number ,
        required : true
    } ,
    randomNumberCode : {
        type : String ,
        required : true
    } ,
    payment : {
        type : String ,
        default : 'No'
    } , 
    createAt : {
        type : Date ,
        default : Date.now
    } ,
    resName : {
        type : String ,
        required : true
    } ,
})

const DonateSchema = moongose.model('donate' , donateSchema)
module.exports = DonateSchema