const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductByName,
  updateProductByName,
  deleteProductByName
} = require('../controllers/product');

router.route('/')
  .get(getAllProducts)
  .post(createProduct)

router.route('/:name')
  .get(getProductByName)
  .put(updateProductByName)
  .delete(deleteProductByName)

module.exports = router;
