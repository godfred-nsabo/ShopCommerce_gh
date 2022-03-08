'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const use = require('./backend/middlewares/appMiddleware')
require('dotenv/config');

/** middlewares */
// app.use(bodyParser.json())
app.use(express.json());
app.use(morgan('tiny'));
const api = process.env.API_URL;
// http://localhost:3000/api/v1/products
app.get(`${api}/products`, (req, res)=> {
  const product = {
    id: 1,
    name: 'hair dresser',
    image: 'some_url'
  }
  res.send(product)
});

app.post(`${api}/products`, (req, res)=> {
	const newProduct = req.body;
	console.log(newProduct);
	res.send(newProduct)
  });
app.listen(3000, () => {
 
  console.log('server is running on http://localhost:3000')
})
