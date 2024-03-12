const { Order, User, Product } = require('../models/models');


const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Check if both userId and products are provided in the request body
    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ error: 'User ID and products are required' });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if all products exist in the database
    const existingProducts = await Product.find({ _id: { $in: products }});
    if (existingProducts.length !== products.length) {
      return res.status(404).json({ error: 'One or more products do not exist' });
    }

    // If user exists, proceed to create the order
    const order = new Order({ products, user: userId });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'firstName lastName email')
      .populate('products', 'name');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrdersByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const orders = await Order.find({ insertionDate: date });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOrdersByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const orders = await Order.find({ products: productId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { userId, products } = req.body; 

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingProducts = await Product.find({ _id: { $in: products }});
    if (existingProducts.length !== products.length) {
      return res.status(404).json({ error: 'One or more products do not exist' });
    }
    
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { userId, products }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createOrder, getAllOrders, getOrdersByDate, getOrdersByProduct, updateOrder, deleteOrder };
