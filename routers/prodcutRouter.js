const express = require('express');
const router = express.Router();
const ProdcutController = require('../controllers/ProdcutController')

router.post('/setNewProdcut' , ProdcutController.setNewProdcut)
router.get('/getProdcuts' , ProdcutController.getAllProducts)
router.post('/setRating/:id' ,ProdcutController.ratingProduct )
router.get('/getProdcut/:title' , ProdcutController.searchItemByTitle)
router.put('/updateProduct/:id' , ProdcutController.updateProdcut)
router.delete('/delete/:id' , ProdcutController.deleteProduct)
router.get('/:id' , ProdcutController.getProductById)



module.exports = router

