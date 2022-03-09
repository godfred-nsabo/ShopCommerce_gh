'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true
  }
})

exports.Product = mongoose.model('Product', productSchema);

const eProducts = mongoose.Schema({
  id: String,
  name: String,
  description: String,
  richDescription: String,
  image: String,
  images: String,

})

exports.Products = mongoose.model('ListedProduct', eProducts);
