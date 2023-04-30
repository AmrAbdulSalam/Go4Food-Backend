const moongose = require('mongoose')
let Schema = moongose.Schema;



let orderSchema = new Schema({
    email : {
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
    paymentType : {
        type : String ,
        default : 'cash'
    } , 
    userRate : {
        type : Number ,
        min : 0 ,
        max : 5 ,
        default : 0
    } ,
    createAt : {
        type : Date ,
        default : Date.now
    }
})

const OrderSchema = moongose.model('order' , orderSchema)
module.exports = OrderSchema