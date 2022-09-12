const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/estore");

const conn = mongoose.connection;

conn.on("connected", () => {
  console.log("Connected to db");
});

conn.on("diconnected", () => {
  console.log("Disconnected from db");
});

conn.on("error", () => {
  console.log("Could not connected to db");
});
