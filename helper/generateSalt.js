"use strict";

const crypto = require("crypto");

const { helperConstant } = require("../constants/messages");

const generateSalt = (rounds) => {
    if (rounds >= 15) {
        throw new Error(`${rounds} ${helperConstant.generateSaltNUmber}`);
    }
    if (typeof rounds !== "number") {
        throw new Error(helperConstant.generateSaltError);
    }
    if (rounds == null) {
        rounds = 10;
    }
    return crypto
        .randomBytes(Math.ceil(rounds / 2))
        .toString("hex")
        .slice(0, rounds);
};

module.exports = generateSalt;
