const express = require('express')
const router = express.Router()
const FavoriteController = require('../controllers/FavoriteController')



router.get('/checkUser/:mail' , FavoriteController.getUserList)
router.post('/insertUser/:mail' , FavoriteController.inserToFavorite)

module.exports = router