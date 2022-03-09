"use strict";

const express = require("express");
const { Category } = require("../models/category");
const { Product } = require("../models/product");

const getProduct = async (req, res) => {
    const productList = await Product.find();

    if (!productList) {
        res.status(500).json({ sucess: false });
    }
    res.send(productList);
};

const addProduct = async (req, res) => {
    /** Validating Category */
    let category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid Category");

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated,
    });

    product = await product.save();
    if (!product) return res.status(500).send("The product cannot be created");
    return res.send(product);
};

module.exports = {
    addProduct: addProduct,
    getProduct: getProduct,
};
