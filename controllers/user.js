"use strict";

const { User } = require("../models/user");
const { userConstant } = require("../constants/messages");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
    const userList = await User.find().select('-passwordHash');

    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
};

const getSingleUser = async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) {
        res.status(500).json({
            message: userConstant.getSingleUserError,
        });
    }
    res.status(200).send(user);
};

const addUser = async (req, res) => {
    let salt = await bcrypt.genSalt(10);
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, salt),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    });

    user = await user.save();

    if (!user) return res.status(404).send(userConstant.addUserError);
    res.send(user);
};

module.exports = {
    getUser: getUser,
    addUser: addUser,
    getSingleUser: getSingleUser,
};
