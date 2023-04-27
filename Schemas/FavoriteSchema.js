const mongoose = require('mongoose')
let Schema = mongoose.Schema ;

let favoriteSchema = new Schema({
    productId : {
        type : Schema.Types.ObjectId ,
        required : true
    } , 

    email : {
        type : String ,
        required : true
    }

})


const FavoriteSchema = mongoose.model('favorite' , favoriteSchema)
module.exports = FavoriteSchema