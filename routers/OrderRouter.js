const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController')

router.post('/getRecommendation' , OrderController.getRecommendation)
router.get('/userMoneySaved' , OrderController.getUserTotalMoneySaved)
router.post('/getOrders' , OrderController.getOrdersForResturant)
router.post('/insertOrder/:email' , OrderController.insertOrder)
router.post('/updateRate/:email' , OrderController.updateRate)
router.get('/:email' , OrderController.getOrder)
module.exports = router