const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
require("./v1/models/db");
const app = express();
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", ["x-token", "x-refresh"]);
  next();
});

app.use(express.static("uploads"));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to express server");
});

// http://localhost:8888/api/v1/  users
app.use("/api/v1/users", require("./v1/routes/user.route"));

// http://localhost:8888/api/v1/customers
app.use("/api/v1/customers", require("./v1/routes/customer.route"));

// http://localhost:8888/api/v1/orders
app.use("/api/v1/orders", require("./v1/routes/order.route"));

// http://localhost:8888/api/v1/categories
app.use("/api/v1/categories", require("./v1/routes/category.route"));

// http://localhost:8888/api/v1/products
app.use("/api/v1/products", require("./v1/routes/product.route"));

// http://localhost:8888/api/v1/ratings
app.use("/api/v1/ratings", require("./v1/routes/rating.route"));

// http://localhost:8888/api/v1/auth
app.use("/api/v1/auth", require("./v1/routes/auth.route"));

app.listen(port, () => console.log(`Server is listening on port ${port}`));
