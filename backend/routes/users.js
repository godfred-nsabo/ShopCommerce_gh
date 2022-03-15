const User = require("../controllers/user");
const express = require("express");
const Route = express.Router();

Route.get("/", User.getUser);
Route.post("/", User.addUser);

module.exports = Route;
