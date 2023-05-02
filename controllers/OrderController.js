const OrderSchema = require('../Schemas/OrderSchema')


let insertOrder = (req , res) => {
    orderSchema = new OrderSchema({
        email : req.params.email ,
        productId : req.body.productId ,
        totalPrice : req.body.totalPrice ,
        price : req.body.price ,
        quantity : req.body.quantity ,
        randomNumberCode : req.body.randomNumberCode ,
        paymentType : req.body.paymentType ,
        userRate : req.body.userRate ,
        resName : req.body.resName ,
        picture : {
            url : req.body.picture['url'],
            title : req.body.picture['title'] 
        } ,
        timeToCollect : req.body.timeToCollect ,
    })
    orderSchema.save()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => 
        res.status(404).json(err)
    )
}

let updateRate = (req , res) => {
    OrderSchema.findOneAndUpdate({
        email : req.params.email ,
        productId : req.body.productId ,
        randomNumberCode : req.body.randomNumberCode
    } , 
    {
        userRate : req.body.userRate
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(400).json(err)
    })
}

let getOrder = (req , res) => {
    OrderSchema.find({
        email : req.params.email 
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(400).json(err)
    })
}


module.exports = {
    insertOrder ,
    updateRate ,
    getOrder
}