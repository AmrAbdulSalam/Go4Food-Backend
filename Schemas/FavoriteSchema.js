const mongoose = require('mongoose')
let Schema = mongoose.Schema ;

let favoriteSchema = new Schema({
    productId : {
        type : Schema.Types.ObjectId ,
        required : true
    } , 

    userId : {
        type : Schema.Types.ObjectId ,
        required : true
    }

})


const FavoriteSchema = mongoose.model('favorite' , favoriteSchema)
module.exports = FavoriteSchema