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

let newUser = () => {
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


module.exports = {
    getAllUserInformation ,
    newUser
}