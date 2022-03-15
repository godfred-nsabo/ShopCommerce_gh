"use strict";

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    // id: {
    //     type: mongoose.Schema.Types.ObjectId,
    // },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    richDescription: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    images: [
        {
            type: String,
        },
    ],
    brand: {
        type: String,
        default: "",
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 500,
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});
/** Duplicate the ID field */
productSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
/** Ensure virtual fields are serialised. */
productSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,

    /**remove the _id of every document before returning the result */
    transform: function (doc, ret, otpions) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

exports.Product = mongoose.model("Product", productSchema);
