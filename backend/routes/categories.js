"use strict";

const express = require("express");
const Category = require("../controllers/category");
const router = express.Router();

router.get("/", Category.getCategory);
router.get("/:id", Category.getCategoryById);
router.put("/:id", Category.updateCategory);
router.post("/", Category.addCategory);
router.delete("/:id", Category.deleteCategory);

module.exports = router;
