const express = require('express');
const { default: mongoose, connect } = require('mongoose');
let UserSchema = require('./Schemas/UserSchema')
var bodyParser = require('body-parser');
const prodcutRouter = require('./routers/ProdcutRouter')
const UserController = require('./routers/UserRouter')
const FavoriteRouter = require('./routers/FavoriteRouter')
const OrderRouter = require('./routers/OrderRouter')
require("dotenv").config();
const app = express()
const PORT = 3333 

app.use(bodyParser.json());

let ConfigDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URL_CONNECT)
        console.log("Database is connect and ready !! ")

    } catch (err){
        console.log(err)
    }
}



app.get('/' , (req,res) =>{
    res.send(`env is : ${process.env.TEST_INFO}`)
})

app.get('/testUser' , (req,res) =>{
    res.json(
        {
            "usernames" : ['amraaa1' , 'usa123' , 'amr'] ,
            "passwords" : ['1222223' , '5555' , '0595664422'],
        }
    )

})



//Set New User
app.use('/user' , UserController)
//Set new product
app.use('/prodcut',prodcutRouter);

//Set Product & User to Favorite 
app.use('/favorite' , FavoriteRouter)
//Set a new Order
app.use('/order' , OrderRouter)
app.listen(PORT , ()=> {
    console.log(`Welcome for the first time from port ${PORT}`)
    ConfigDB();
})


