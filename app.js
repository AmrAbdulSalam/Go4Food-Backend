const express = require('express');
const { default: mongoose, connect } = require('mongoose');
let UserSchema = require('./Schemas/UserSchema')
var bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const prodcutRouter = require('./routers/ProdcutRouter')
const UserController = require('./routers/UserRouter')
const FavoriteRouter = require('./routers/FavoriteRouter')
const OrderRouter = require('./routers/OrderRouter')
const PendingRouter = require('./routers/PendingRouter')
const DonateRouter = require('./routers/DonateRouter')
const StatisticsRouter = require('./routers/StatisticsRouter')

const cors = require('cors');
require("dotenv").config();
const app = express()
const PORT = 3333 

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

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

let Notification = (req , res) => {
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      })
        .then(response => {
          // Handle the response
          if (response.ok) {
            // Request was successful
            console.log('Notification sent successfully!');
          } else {
            // Request failed
            console.error('Failed to send notification:', response.statusText);
          }
        })
        .catch(error => {
          // Handle network errors
          console.error('Error sending notification:', error);
        });
      
}


//Set New User
app.use('/user' , cors(), UserController)
//Set new product
app.use('/prodcut',cors(),prodcutRouter);

//Set Product & User to Favorite 
app.use('/favorite' , FavoriteRouter)
//Set a new Order
app.use('/order' ,cors(), OrderRouter)
//Set a new pending request
app.use('/pending' ,cors(), PendingRouter)
//Donate from users to Resturants
app.use('/donate' ,cors(), DonateRouter)
app.use('/profile' , express.static('uploads/images'))
//Stat
app.use('/statistics' , cors() , StatisticsRouter)
app.use('/notification' , cors() , Notification)
app.listen(PORT , ()=> {
    console.log(`Welcome for the first time from port ${PORT}`)
    ConfigDB();
})


