const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street: {
        type: String,
        default: "",
    },
    apartment: {
        type: String,
        default: "",
    },
    zip: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },
});

/** Duplicate the ID field */
userSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
/** Ensure virtual fields are serialised. */
userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,

    /**remove the _id of every document before returning the result */
    transform: function (doc, ret, otpions) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

exports.User = mongoose.model("User", userSchema);
exports.userSchema = userSchema;
