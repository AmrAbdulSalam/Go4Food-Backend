const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')


router.get('/getAllUserInformation' ,UserController.getAllUserInformation)
router.post('/newUser' , UserController.newUser)
router.get('/getUser/:email' ,UserController.searchForUserByEmail)
router.post('/Signin' , UserController.checkCredentials)
router.get('/:id', UserController.searchForUserById)
router.put('/:id' , UserController.updateUser)
router.delete('/:id' , UserController.deleteUserById)

module.exports = router