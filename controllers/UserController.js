let UserSchema = require('../Schemas/UserSchema')
const jwt = require('jsonwebtoken')
require("dotenv").config();

let getAllUserInformation = (req , res) => {
    UserSchema.find()
    .then((result) =>{
        res.send(result)
    })
    .catch(err =>{
        console.log(err)
    })
}

let newUser = (req , res) => {
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
        res.json(
            {
                "message" : "added"
            }
        )
        //console.log(item)
    })
    .catch( err => {
        res.json(
            {
                "message" : "found"
            }
        )
        // console.log(err)
    });
}

let searchForUserById = (req , res) => {
    let id = req.params.id 
    UserSchema.findById(id)
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        console.log(err)
    })
}

let searchForUserByEmail = (req , res) => {
    let email = req.params.email
    UserSchema.find(
        {
            email : email
        }
    )
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        console.log(err)
    })
}

let deleteUserById = (req , res) => {
    let id = req.params.id
    UserSchema.findByIdAndDelete(id)
    .then(item => {
        res.send(item)
        console.log(`Items was deleted :${item}`)
    })
    .catch(err => {
        console.log(err)
    })
}

let updateUser = (req,res) => {
    let id = req.params.id
    let update = req.body
    
    UserSchema.findByIdAndUpdate(id , update)
    .then(item => {
        res.send(item)
    })
    .catch(err => {
        console.log(err)
    })
    
}

let checkCredentials = (req , res) => {
    let {email , password} = req.body;
    UserSchema.findOne(
        {
            email : email
        }
    ).then(user => {
        if(user.password == password) {
            let newUser = {
                'email' : user.email ,
                'id' : user._id ,
                'country' : user.country ,
                'firstname' : user.firstname ,
                'lastname' : user.lastname ,
                'phone' : user.phoneNumber
            }
            let token = jwt.sign(newUser , process.env.SECRET_KEY , {expiresIn : "5m"})
            res.status(200).json(
                {
                    "message" : "user found" , 
                    "token" : token
                }
            )
        }
        else
            res.status(404).json(
                {
                    "message" : "Wrong Password"
                }
            )
    })
    .catch(err => {
        res.json(
            {
                "message" : "Error while finding user"
            }
        )
        console.log(err)
    })
}
module.exports = {
    getAllUserInformation ,
    newUser ,
    searchForUserById ,
    searchForUserByEmail ,
    deleteUserById ,
    updateUser ,
    checkCredentials

}