let FavoriteSchema = require('../Schemas/FavoriteSchema')
let ProductsSchema = require('../Schemas/ProductsSchema')

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

let inserToFavorite = async (req , res) => {

    const product = await ProductsSchema.findById(req.body.productId)
    let favUsersFound = product.favoriteUsers.find(user => user == req.params.mail)
    if(favUsersFound){
        return res.status(404).json({
            "message" : "Its already in favorite"
        })
    }
    product.favoriteUsers.push(req.params.mail)
    await product.save()
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