const express = require('express');
const { default: mongoose, connect } = require('mongoose');
let UserSchema = require('./Schemas/UserSchema')
var bodyParser = require('body-parser');

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

app.get('/getAllUserInformation' , (req,res)=>{
    UserSchema.find()
    .then((result) =>{
        res.send(result)
    })
    .catch(err =>{
        console.log(err)
    })
})

app.post('/newUser' , (req , res) => {
    let userinformation = new UserSchema({
        firstname:req.body.firstname ,
        lastname:req.body.lastname,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        country:req.body.country,
        password:req.body.password,

    });

    userinformation.save()
    .then((item) =>{
        res.send("UserAdded to Database")
        console.log(item)
    })
    .catch( err => {
        console.log(err)
    });
});

app.listen(PORT , ()=>{
    console.log(`Welcome for the first time from port ${PORT}`)
    ConfigDB();
})


