const express = require('express')
const router = express.Router()
const DonateController = require('../controllers/DonateController')



router.post('/setDonate' , DonateController.donateFromUser)
router.get('/getDonate' , DonateController.getAllDonates)
module.exports = router