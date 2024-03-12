const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const OrderSchema = new mongoose.Schema({
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  insertionDate: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', ProductSchema);
const User = mongoose.model('User', UserSchema);
const Order = mongoose.model('Order', OrderSchema);

module.exports = { Product, User, Order };
