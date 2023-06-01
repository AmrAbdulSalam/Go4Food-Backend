const PendingSchema = require('../Schemas/PendingSchema')
const ProductSchema = require('../Schemas/ProductsSchema')
const AWS = require('aws-sdk');
require("dotenv").config();
const multer = require('multer');
const path = require('path')
const multerS3 = require('multer-s3');
const fs = require('fs');


let addResturant = (req, res) => {
    pendingSchema = new PendingSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        resName: req.body.resName
    })
    pendingSchema.save()
        .then(item => {
            console.log(item)
            res.send(
                pendingSchema
            )
        }).catch(err => {
            console.log(err)
        })
}

let pendingResturants = (req, res) => {
    PendingSchema.find()
        .then(data =>
            res.json(data)
        )
}

let deleteResturant = (req, res) => {
    PendingSchema.findOneAndDelete({
        email: req.body.email
    })
        .then(data => res.send('deleted'))
}
let acceptResturants = (req, res) => {
    PendingSchema.findOneAndDelete({
        email: req.body.email
    })
        .then(data => {
            let newData = {
                resName: data.resName,
                location: data.location,
                boxNo: 0,
                category: "None",
                price: {
                    oldPrice: 0,
                    newPrice: 0
                },
                email: data.email,
                password: data.password,
                available: false,
                timeToCollect: "09:00 AM-12:00 PM",
                picture: data.picture
            }
            productSchema = new ProductSchema(newData)
            productSchema.save()
            console.log(newData)
        })
}
// const storage = multer.diskStorage({
//     destination : 'uploads/images' ,
//     filename : (req , file ,cb) => {
//         return cb(null , `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })
// const upload = multer({ 
//     storage : storage
// });


//configuring the AWS environment
AWS.config.update({
    accessKeyId: "AKIA33HVQD3TR76ID63Q",
    secretAccessKey: "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"
  });
  
  
  var s3 = new AWS.S3();
  
  let uploadImageToAWS = async (req, res) => {
    const pathFile = req.body.pathFile;
  
    const params = {
      Bucket: 'go4food-pic',
      Body: fs.createReadStream(pathFile),
      Key: "images/" + path.basename(pathFile)
    };
  
    s3.upload(params, function (err, data) {
  
      if (err) {
        console.log("Error", err);
        res.json({ error: err });
      }
      else {
        console.log("Uploaded in:", data.Location);
        res.json({ success: true })
        return;
      }
    });
  }
  

// let uploadImageToAWS = async (req, res) => {
//     upload.single('image')(req, res, (error) => {
//         console.log(req.file)
//         console.log('test')
//     })
// };


module.exports = {
    addResturant,
    pendingResturants,
    deleteResturant,
    acceptResturants,
    uploadImageToAWS
}