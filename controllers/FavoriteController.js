let FavoriteSchema = require('../Schemas/FavoriteSchema')
let getUserList = (req , res) => {
    let email = req.params.mail
    FavoriteSchema.find(
        {
            "email" : email
        }
    )
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        console.log(err)
    })
}

let inserToFavorite = (req , res) => {
    insert = new FavoriteSchema (
        {
            "email" : req.params.mail , 
            "productId" : req.body.productId
        }
    )
    insert.save()
    .then(result => {
        res.json({
            "message"  : 'item added to favorite'
        })
    })
}

module.exports = {
    getUserList ,
    inserToFavorite
}