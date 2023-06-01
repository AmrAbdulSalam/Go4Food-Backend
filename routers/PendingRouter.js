const express = require('express');
const router = express.Router();
const PendingController = require('../controllers/PendingController')

router.post('/addResturant' , PendingController.addResturant)
router.post('/uploadePic' , PendingController.uploadImageToAWS)
router.post('/acceptResturant' , PendingController.acceptResturants)
router.get('/getPendingResturants' , PendingController.pendingResturants)
router.delete('/deleteResturant' , PendingController.deleteResturant)

module.exports = router