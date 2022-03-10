const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({});

/** Duplicate the ID field */
orderSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
/** Ensure virtual fields are serialised. */
orderSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,

    /**remove the _id of every document before returning the result */
    transform: function (doc, ret, otpions) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

exports.Order = mongoose.model("Order", orderSchema);
