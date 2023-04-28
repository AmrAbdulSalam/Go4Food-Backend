const express = require('express')
const router = express.Router()
const FavoriteController = require('../controllers/FavoriteController')



router.get('/checkUser/:mail' , FavoriteController.getUserList)
router.post('/insertUser/:mail' , FavoriteController.inserToFavorite)
router.delete('/deleteFavorite/:email' , FavoriteController.deleteFavorite)
module.exports = router