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

let deleteFavorite = async (req, res) => {
    const product = await ProductsSchema.findById(req.body.productId)
    let userFav = product.favoriteUsers.find(user => user == req.params.email)
    let deleteProdcutId ;
    if(userFav == req.params.email){
        product.favoriteUsers.pop(userFav)
        product.save();
        FavoriteSchema.findOneAndDelete(
            {
                email : req.params.email ,
                productId : req.body.productId
            }
        )
        .then(result => {
            res.status(200).json({
                "message" : "item deleted"
            })
        })
        .catch()
       
        
    }
    else{
        res.status(404).json(
            {
                "message" : "User have no favorite"
            }
        )
    }
}

module.exports = {
    getUserList ,
    inserToFavorite ,
    deleteFavorite
}