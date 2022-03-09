'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');

/** Middleware */
app.use(express.json());
app.use(morgan('tiny'));


 /** Routes */
const productRoutes = require('./backend/routes/product')
const categoriesRoutes = require("./backend/routes/categories");
const usersRoutes = require("./backend/routes/users");
const ordersRoutes = require("./backend/routes/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);


/** Database */
mongoose
.connect(process.env.CONNECTION_STRING, {
  dbName: 'shop-Commerce-database'
})
.then(()=> {
  console.log('Database Connection is ready...')
})
.catch((err) => {
  console.log(err);
})

/** Server */

app.listen(3000, () => {
 
  console.log('server is running on http://localhost:3000')
})
