const mongoose = require('mongoose');
const {productSchema} = require('../schema/schema')

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
