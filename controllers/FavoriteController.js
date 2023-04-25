let FavoriteSchema = require('../Schemas/FavoriteSchema')
let getUserList = (req , res) => {
    let userId = req.params.id
    FavoriteSchema.find(
        {
            "userId" : userId
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
            "userId" : req.params.id , 
            "productId" : req.body.productId
        }
    )
    insert.save()
}

module.exports = {
    getUserList ,
    inserToFavorite
}