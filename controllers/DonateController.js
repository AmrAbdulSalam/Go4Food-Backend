const DonateSchema = require('../Schemas/DonateSchema')
const ProductSchema = require('../Schemas/ProductsSchema')


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
let updatePay = async (req , res) => {
    if(req.body.payment == 'Yes') {
        DonateSchema.findByIdAndUpdate( req.body.id, {
            payment : 'Yes'
        })
        .then(result => {
            res.json(result)
        })
    }
    else if (req.body.payment == 'No') {
        let data = await ProductSchema.find({
            resName : req.body.resName
        })
        let totalNumberOfBoxes = data[0].boxNo

        DonateSchema.findByIdAndDelete(req.body.id.toString())
        .then(result => {
            let boxNumber = result.quantity
            ProductSchema.findOneAndUpdate({
                resName : req.body.resName
            } , 
            {
                boxNo : totalNumberOfBoxes + boxNumber
            })
            .then(result => {
                res.json(result)
            })
        })
    }
}
module.exports = {
    donateFromUser ,
    getAllDonates ,
    updatePay
}