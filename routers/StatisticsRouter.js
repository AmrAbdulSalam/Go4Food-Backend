const express = require('express')
const router = express.Router()
const StatisticsController = require('../controllers/StatisticsController')


router.get('/product' , StatisticsController.productStat)

module.exports = router