const { Product } = require('../models/models');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ error: 'Product already exists' });
    }
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getProductByName = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Product.findOneAndUpdate({ name }, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Product.findOneAndDelete({ name });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllProducts, createProduct, getProductByName, updateProductByName, deleteProductByName };
