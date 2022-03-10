const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

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

exports.User = mongoose.model('User', userSchema);
