const PendingSchema = require('../Schemas/PendingSchema')
const ProductSchema = require('../Schemas/ProductsSchema')

let addResturant = (req ,res) => {
    pendingSchema = new PendingSchema({
        firstName : req.body.firstName ,
        lastName : req.body.lastName ,
        email : req.body.email ,
        password : req.body.password ,
        phoneNumber : req.body.phoneNumber ,
        location : req.body.location , 
        resName : req.body.resName
    })
    pendingSchema.save()
    .then( item =>{
        console.log(item)
        res.send(
            pendingSchema
        )
    }).catch( err =>{
        console.log(err)
    })
}

let pendingResturants = (req , res) => {
    PendingSchema.find()
    .then(data => 
        res.json(data)
    )
}

let deleteResturant = (req,res) => {
    PendingSchema.findOneAndDelete({
        email : req.body.email
    })
    .then(data => res.send('deleted'))
}
let acceptResturants = (req , res) => {
    PendingSchema.findOneAndDelete({
        email : req.body.email
    })
    .then(data => {
        let newData = {
            resName : data.resName ,
            location : data.location ,
            boxNo : 0 ,
            category : "None" ,
            price : {
                oldPrice : 0 ,
                newPrice : 0
            } ,
            email : data.email ,
            password : data.password ,
            available : false ,
            timeToCollect : "09:00 AM-12:00 PM" ,
            picture : data.picture
        }
        productSchema = new ProductSchema(newData)
        productSchema.save()
        console.log(newData)
    })
}

module.exports = {
    addResturant ,
    pendingResturants ,
    deleteResturant ,
    acceptResturants
}