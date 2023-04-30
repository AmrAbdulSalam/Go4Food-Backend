const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController')

router.post('/insertOrder/:email' , OrderController.insertOrder)
router.post('/updateRate/:email' , OrderController.updateRate)
router.get('/:email' , OrderController.getOrder)

module.exports = router