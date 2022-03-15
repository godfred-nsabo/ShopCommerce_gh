const User = require("../controllers/user");
const express = require("express");
const Route = express.Router();

Route.get("/", User.getUser);
Route.post("/", User.addUser);

Route.get("/:id", User.getSingleUser);

module.exports = Route;
