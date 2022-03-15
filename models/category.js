const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    icon: {
        type: String,
    },
    image: {
        type: String,
        default: "",
    },
});

/** Duplicate the ID field */
categorySchema.virtual("id").get(function () {
    return this._id.toHexString();
});
/** Ensure virtual fields are serialised. */
categorySchema.set("toJSON", {
    virtuals: true,
    versionKey: false,

    /**remove the _id of every document before returning the result */
    transform: function (doc, ret, otpions) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

exports.Category = mongoose.model("Category", categorySchema);
