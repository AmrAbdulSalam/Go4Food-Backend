const OrderSchema = require('../Schemas/OrderSchema')


let insertOrder = (req, res) => {
    orderSchema = new OrderSchema({
        email: req.params.email,
        productId: req.body.productId,
        totalPrice: req.body.totalPrice,
        price: req.body.price,
        quantity: req.body.quantity,
        moneySaved : req.body.moneySaved,
        randomNumberCode: req.body.randomNumberCode,
        paymentType: req.body.paymentType,
        userRate: req.body.userRate,
        resName: req.body.resName,
        picture: {
            url: req.body.picture['url'],
            title: req.body.picture['title']
        },
        timeToCollect: req.body.timeToCollect,
    })
    orderSchema.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err =>
            res.status(404).json(err)
        )
}

let updateRate = (req, res) => {
    OrderSchema.findOneAndUpdate({
        email: req.params.email,
        productId: req.body.productId,
        randomNumberCode: req.body.randomNumberCode
    },
        {
            userRate: req.body.userRate
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}

let getOrder = (req, res) => {
    OrderSchema.find({
        email: req.params.email
    })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}


let recomendResturants = (user, k, n, data) => {
    const userRatings = data.filter((d) => d.username === user);

    const distances = [];
    for (let i = 0; i < data.length; i++) {
        const other = data[i];
        if (other.username !== user) {
            const distance = Math.sqrt(
                userRatings.reduce(
                    (sum, r1) => sum + Math.pow(r1.rate - other.rate, 2),
                    0
                )
            );
            distances.push({ username: other.username, distance });
        }
    }
    const nearestNeighbors = distances
        .sort((a, b) => a.distance - b.distance)
        .slice(0, k)
        .map((d) => d.username);

    const ratings = {};
    for (let i = 0; i < data.length; i++) {
        const d = data[i];
        if (nearestNeighbors.includes(d.username) && !userRatings.includes(d)) {
            if (!ratings[d.restaurantname]) {
                ratings[d.restaurantname] = { sum: 0, count: 0 };
            }
            ratings[d.restaurantname].sum += d.rate;
            ratings[d.restaurantname].count++;
        }
    }
    const predictions = Object.keys(ratings)
        .map((restaurantname) => ({
            restaurantname,
            score: ratings[restaurantname].sum / ratings[restaurantname].count,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, n);

    return predictions;
}






let getRecommendation = (req, res) => {
    let email = req.body.email
    let k = req.body.k
    let recommendNumber = req.body.recommendNumber
    let userFound;
    OrderSchema.findOne({
        email: email
    })
        .then(result => {
            if (result != null) {
                OrderSchema.find()
                    .then(result => {
                        let data = result.map(obj => {
                            return { username: obj.email, restaurantname: obj.resName, rate: obj.userRate }
                        })
                        let recomend = recomendResturants(email, k, recommendNumber, data)
                        console.log(recomend)
                        res.status(200).send(recomend)
                    })
            }
            else {
                res.status(404).json([])
            }
        })
        .catch(err => {
            console.log(err)
        })
}

let getOrdersForResturant = (req ,res) => {
    console.log('teeest')
    OrderSchema.find({
        resName : req.body.resName
    })
    .then(data => {
        res.json(data)
    })
}

let getUserTotalMoneySaved = (req , res) => {
    OrderSchema.find({
        email : req.body.email
    })
    .then(result => {
        let newArr = result.map(object => {
            return object.moneySaved
        })
        let sum = newArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        res.json(sum)
    })
    .catch(err => console.log(err))
}

module.exports = {
    insertOrder,
    updateRate,
    getOrder,
    getRecommendation ,
    getOrdersForResturant ,
    getUserTotalMoneySaved
}