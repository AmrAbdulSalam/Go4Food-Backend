const ProductSchema = require('../Schemas/ProductsSchema')

let setNewProdcut = (req , res) => {
    prodcutSchema = new ProductSchema({
        category : req.body.category ,
        title : req.body.title ,
        resName : req.body.resName ,
        boxNo : req.body.boxNo ,
        price : {
            oldPrice : req.body.price['old'] ,
            newPrice : req.body.price['new']
        } ,
        timeToCollect : req.body.timeToCollect ,
        location : req.body.location ,
        description : req.body.description , // not required
        available : req.body.available ,
        picture : {
            url : req.body.picture['url'],
            title : req.body.picture['title'] 
        } ,
        dateOfAnnouncment : req.body.dateOfAnnouncment // not required
    })
    prodcutSchema.save()
    .then( item =>{
        console.log(item)
        res.send(
            prodcutSchema
        )
    }).catch( err =>{
        console.log(err)
    })
}

let getAllProducts = (req , res) => {
    ProductSchema.find()
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        res.send(err)
    })
}

let getProductById = (req , res) => {
    let getID = req.params.id 
    ProductSchema.findById(getID)
    .then(item => {
        res.send(item)
    })
    .catch(err => {
        res.send(err)
    })
}

let deleteProduct = (req , res) => {
    let id = req.params.id
    ProductSchema.findByIdAndDelete(id)
    .then(item => {
        console.log(`Items was deleted :${item}`)
    })
    .catch(err => {
        console.log(err)
    })
}

let searchItemByTitle = (req , res) => {
    let title = req.params.title
    ProductSchema.find(
        {
            title : title
        }
    )
    .then(item => {
        res.json(item)
    })
    .catch(err => {
        console.log(err)
    })
}

let updateProdcut = (req , res) => {
    let id = req.params.id
    let update = req.body
    ProductSchema.findByIdAndUpdate(id , update)
    .then(item => {
        res.send(item)
    })
    .catch(err => {
        console.log(err)
    })

}

let ratingProduct = async (req , res) => {
    let productId = req.params.id
    const product = await ProductSchema.findById(productId)
    let findUser = product.ratingUsers.find(user => user.userId.toString() === req.body.userId.toString())
    if(findUser) {
        return res.status(404).json({
            "message" : "user already rated"
        })
    }
    let totalRating = 0
    product.ratingUsers.push({
        userId : req.body.userId ,
        rating : req.body.rating
    })

    product.ratingUsers.forEach(rate => {
        totalRating += rate.rating
    })
    product.avgRating = totalRating / product.ratingUsers.length
    await product.save()
    
    res.status(200).json({
        "message" : "Rate added"
    })

}

module.exports = {
    setNewProdcut ,
    getAllProducts ,
    getProductById ,
    deleteProduct , 
    searchItemByTitle ,
    updateProdcut ,
    ratingProduct
}

