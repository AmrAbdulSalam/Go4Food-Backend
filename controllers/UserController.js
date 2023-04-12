let UserSchema = require('../Schemas/UserSchema')


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
        res.send("UserAdded to Database")
        console.log(item)
    })
    .catch( err => {
        console.log(err)
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
    ).then(result => {
        if(result.password == password) {
            res.status(200).send("User Found")
        }
        else
            res.status(404).send("Not found")
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