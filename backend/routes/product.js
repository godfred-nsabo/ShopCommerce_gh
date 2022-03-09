"use strict";

const express = require("express");
const router = express.Router();
const Product = require("../controllers/product");

router.get("/", Product.getProduct);
router.post("/", Product.addProduct);

module.exports = router;
