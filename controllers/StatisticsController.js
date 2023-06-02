const ProductsSchema = require('../Schemas/ProductsSchema')
const PendingSchema = require('../Schemas/PendingSchema')
const OrderSchema = require('../Schemas/OrderSchema')
const UserSchema = require('../Schemas/UserSchema')
const DonateSchema = require('../Schemas/DonateSchema')

let numberOfResturants = async () => {
    let data = await ProductsSchema.find()
    return data.map(object => { return object.resName })
}

let numberOfPendingResturants = async () => {
    let data = await PendingSchema.find()
    return data.map(object => { return object.resName })
}


let userOrders = async () => {
    let data = await OrderSchema.find()
    let orders = {}
    data.forEach(name => {
        if (orders[name.resName]) {
            orders[name.resName]++
        }
        else {
            orders[name.resName] = 1
        }
    })
    return orders
}

let resturantRate = async () => {
    let data = await ProductsSchema.find()
    return data.map(object => {
        return {
            resName: object.resName,
            rate: object.avgRating.toFixed(1)
        }
    })
}

let resturantProfit = async () => {
    let data = await OrderSchema.find()
    let orders = {}
    data.forEach(name => {
        if (orders[name.resName]) {
            orders[name.resName] += name.totalPrice
        }
        else {
            orders[name.resName] = name.totalPrice
        }
    })
    for (const key in orders) {
        orders[key] = orders[key].toFixed(2)
    }
    return orders
}

let userCount = async () => {
    let data = await UserSchema.find()
    return { userCount: data.length }
}

let totalNumberOfDonatedBoxed = async () => {
    let data = await DonateSchema.find();
    let totalBoxes = 0;
    for (let i = 0; i < data.length; i++) {
        const object = data[i];
        const boxes = object.quantity;
        totalBoxes += boxes;
    }
    return { totalDonateBoxes: totalBoxes }
}

let totalProfitFun = async () => {
    let data = await OrderSchema.find()
    let totalProfit = 0
    for (let i = 0; i < data.length; i++) {
        const object = data[i];
        const profit = object.totalPrice;
        totalProfit += profit;
    }
    return { TotalProfit: totalProfit.toFixed(2) }
}

let categorysType = async () => {
    let data = await ProductsSchema.find()
    let newArr = data.map(object => { return object.category })
    const occurrences = {};
    for (let i = 0; i < newArr.length; i++) {
        const value = newArr[i];
        if (occurrences[value]) {
            occurrences[value]++;
        } else {
            occurrences[value] = 1;
        }
    }
    return occurrences 
}

let resturantWithTotalNumberOfDonatedBoxes = async () => {
    let data = await DonateSchema.find();
    let donates = {}
    data.forEach(name => {
        if (donates[name.resName]) {
            donates[name.resName] += name.quantity
        }
        else {
            donates[name.resName] = name.quantity
        }
    })
    return donates
}

let productStat = async (req, res) => {
    let resturants = await numberOfResturants()
    let pendingResturants = await numberOfPendingResturants()
    let orders = await userOrders()
    let rating = await resturantRate()
    let profit = await resturantProfit()
    let users = await userCount()
    let totalDonateBoxes = await totalNumberOfDonatedBoxed()
    let totalProfit = await totalProfitFun()
    let category = await categorysType()
    let donatesForEachRes = await resturantWithTotalNumberOfDonatedBoxes()
    let arr = new Array
    arr.push(resturants)
    arr.push(pendingResturants)
    arr.push(orders)
    arr.push(rating)
    arr.push(profit)
    arr.push(users)
    arr.push(totalDonateBoxes)
    arr.push(totalProfit)
    arr.push(category)
    arr.push(donatesForEachRes)
    res.json(arr)
}

module.exports = {
    productStat
}