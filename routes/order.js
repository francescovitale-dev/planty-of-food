const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrdersByDate,
  getOrdersByProduct,
  updateOrder,
  deleteOrder
} = require('../controllers/order');

router.route('/')
  .post(createOrder)
  .get(getAllOrders);

router.route('/:id')
  .put(updateOrder)
  .delete(deleteOrder);

router.route('/date/:date').get(getOrdersByDate);

router.route('/product/:productId').get(getOrdersByProduct);

module.exports = router;

