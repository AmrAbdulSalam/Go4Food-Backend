const express = require('express')
const router = express.Router()
const FavoriteController = require('../controllers/FavoriteController')



router.get('/checkUser/:id' , FavoriteController.getUserList)
router.post('/insertUser/:id' , FavoriteController.inserToFavorite)

module.exports = router