'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const { options } = require('nodemon/lib/config');


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

mongoose.connect(process.env.CONNECTION_STRING, {
  dbName: 'shop-Commerce-database'
})
.then(()=> {
  console.log('Database Connection is ready...')
})
.catch((err) => {
  console.log(err);
})

app.listen(3000, () => {
 
  console.log('server is running on http://localhost:3000')
})
