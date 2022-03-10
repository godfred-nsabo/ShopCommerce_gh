"use strict";

const express = require("express");
const { default: mongoose } = require("mongoose");
const { Category } = require("../models/category");
const { Product } = require("../models/product");

const getProduct = async (req, res) => {
    const productList = await Product.find()
        .select("_id name image price brand description category")
        .populate("category");

    if (!productList) {
        res.status(500).json({ sucess: false });
    }
    res.send(productList);
};

const getProductById = async (req, res) => {
    const oneProduct = await Product.findById(req.params.id).populate(
        "category"
    );

    if (!oneProduct) {
        res.status(500).json({ sucess: false });
    }
    res.send(oneProduct);
};

const getFeaturedPrdt = async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const featuredProducts = await Product.find({ isFeatured: true }).limit(
        count
    );

    if (!featuredProducts) {
        res.status(500).json({ sucess: false });
    }
    res.send(featuredProducts);
};

const getStatistics = async (req, res) => {
    const productStats = await Product.countDocuments();

    if (!productStats) {
        res.status(500).json({ sucess: false });
    }
    res.send({ productStat: productStats });
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

const updateProduct = async (req, res) => {
    let isValidObjectId = mongoose.isValidObjectId(req.params.id);
    if (!isValidObjectId) {
        res.status(400).send("Invalid Product Id");
    }
    /** Validating Category */
    let category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid Category");

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
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
        },
        { new: true }
    );

    if (!product) return res.status(500).send("Product cannot be Updated!");
    res.send(product);
};

const deleteProduct = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                return res.status(200).json({
                    success: true,
                    message: "the Product is deleted",
                });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: "Product not Found!" });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
};

module.exports = {
    addProduct: addProduct,
    getProduct: getProduct,
    getProductById: getProductById,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    getStatistics: getStatistics,
    getFeaturedPrdt: getFeaturedPrdt,
};
