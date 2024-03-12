const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const product = require('./routes/product')
const user = require('./routes/user')
const order = require('./routes/order')
require('dotenv').config()

const port = process.env.PORT || 3000;

// middleware
app.use(express.json())

// routes
app.use('/api/v1/products', product)
app.use('/api/v1/users', user)
app.use('/api/v1/orders', order)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()