"use strict";

const express = require("express");

const { Category } = require("../models/category");

const getCategory = async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({ success: false });
    }
    res.status(200).send(categoryList);
};

const getCategoryById = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        res.status(500).json({
            message: "The category with the given ID was not found",
        });
    }
    res.status(200).send(category);
};

const addCategory = async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
        image: req.body.image,
    });

    category = await category.save();

    if (!category)
        return res.status(404).send("the Category cannot be created!");
    res.send(category);
};

const updateCategory = async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
            image: req.body.image,
        },
        { new: true }
    );

    if (!category) return res.status(404).send("Category cannot be Updated!");
    res.send(category);
};

const deleteCategory = (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (category) {
                return res.status(200).json({
                    success: true,
                    message: "the Category is deleted",
                });
            } else {
                return res
                    .status(404)
                    .json({ success: false, message: "category not found!" });
            }
        })
        .catch((err) => {
            return res.status(400).json({ success: false, error: err });
        });
};

module.exports = {
    getCategory: getCategory,
    getCategoryById: getCategoryById,
    addCategory: addCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
};
