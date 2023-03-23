const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')


router.get('/getAllUserInformation' ,UserController.getAllUserInformation)
router.post('/newUser' , UserController.newUser)


module.exports = router