const express = require('express')
const router = express.Router()
const DonateController = require('../controllers/DonateController')



router.post('/setDonate' , DonateController.donateFromUser)
router.post('/getDonate' , DonateController.getAllDonates)
router.post('/updatePay' , DonateController.updatePay)
module.exports = router