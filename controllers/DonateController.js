const DonateSchema = require('../Schemas/DonateSchema')


let donateFromUser = (req , res) => {
    donateSchema = new DonateSchema({
        email: req.body.email,
        productId: req.body.productId,
        totalPrice: req.body.totalPrice,
        price: req.body.price,
        quantity: req.body.quantity,
        randomNumberCode: req.body.randomNumberCode,
        paymentType: req.body.paymentType,
        resName: req.body.resName,
        orgName: req.body.orgName,
    })
    donateSchema.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err =>
            res.status(404).json(err)
        )
}

let getAllDonates = (req , res) => {
    DonateSchema.find({
        resName : req.body.resName
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err =>
        res.status(404).json(err)
    )
}

module.exports = {
    donateFromUser ,
    getAllDonates
}