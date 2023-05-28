const ProductsSchema = require('../Schemas/ProductsSchema')
const PendingSchema = require('../Schemas/PendingSchema')
const OrderSchema = require('../Schemas/OrderSchema')
const UserSchema = require('../Schemas/UserSchema')

let  numberOfResturants = async () => {
    let data = await ProductsSchema.find()
    return data.map(object => {return object.resName})
}

let  numberOfPendingResturants = async () => {
    let data = await PendingSchema.find()
    return data.map(object => {return object.resName})
}


let userOrders = async () => {
    let data = await OrderSchema.find()
    let orders = {}
    data.forEach(name => {
        if(orders[name.resName]) {
            orders[name.resName]++
        }
        else{
            orders[name.resName] = 1
        }
    })
    return orders
}

let resturantRate = async () => {
    let data = await ProductsSchema.find()
    return data.map(object => {return {
        resName : object.resName ,
        rate : object.avgRating.toFixed(1)
    }})
}

let resturantProfit = async () => {
    let data = await OrderSchema.find()
    let orders = {}
    data.forEach(name => {
        if(orders[name.resName]) {
            orders[name.resName] += name.totalPrice
        }
        else{
            orders[name.resName] = name.totalPrice
        }
    })
    for (const key in orders){
        orders[key] = orders[key].toFixed(2)
    }
    return orders
}

let userCount = async () => {
    let data = await UserSchema.find()
    return {userCount : data.length}
}

let productStat = async (req , res) => {
    let resturants = await numberOfResturants()
    let pendingResturants = await numberOfPendingResturants()
    let orders = await userOrders()
    let rating = await resturantRate()
    let profit = await resturantProfit()
    let users = await userCount()
    let arr = new Array 
    arr.push(resturants)
    arr.push(pendingResturants)
    arr.push(orders)
    arr.push(rating)
    arr.push(profit)
    arr.push(users)
    res.json(arr)
}

module.exports = {
    productStat
}