"use strict";

const crypto = require("crypto");
const { helperConstant } = require("../constants/messages");

const hasher = (password, salt) => {
    let hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    let value = hash.digest("hex");
    return {
        salt: salt,
        hashedpassword: value,
    };
};

const hashedpassword = (password, salt) => {
    if (password == null || salt == null) {
        throw new Error(helperConstant.generateHashError);
    }
    if (typeof password !== "string" || typeof salt !== "string") {
        throw new Error(helperConstant.generateHashPasswordError);
    }
    return hasher(password, salt);
};

module.exports = {
    hashedpassword,
    hasher,
};
