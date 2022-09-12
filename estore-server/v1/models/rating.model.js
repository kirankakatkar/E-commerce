const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ratingSchema = new mongoose.Schema({
  ratingId: Number,
  custId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  rate: Number,
  review: String,
  status: Number,
});

ratingSchema.plugin(AutoIncrement, { inc_field: "ratingId" });

module.exports = mongoose.model("Rating", ratingSchema);
