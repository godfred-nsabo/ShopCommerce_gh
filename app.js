"use strict";

const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv/config");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,  /** limit each IP to 100 requests per windowMs */
});

app.use(cors());
app.options("*", cors());

/** Middleware */
app.use(express.json());
app.use(morgan("tiny"));

/** Routes */
const productRoutes = require("./backend/routes/product");
const categoriesRoutes = require("./backend/routes/categories");
const usersRoutes = require("./backend/routes/users");
const ordersRoutes = require("./backend/routes/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, limiter, categoriesRoutes);
app.use(`${api}/products`, limiter, productRoutes);
app.use(`${api}/users`, limiter, usersRoutes);
app.use(`${api}/orders`, limiter, ordersRoutes);

/** Database */
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: "shop-Commerce-database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

/** Server */

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
