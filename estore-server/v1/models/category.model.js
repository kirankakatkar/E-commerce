const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const categorySchema = new mongoose.Schema({
  catId: Number,
  title: String,
  avatar: String,
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  parentCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  status: Number,
});

categorySchema.plugin(AutoIncrement, { inc_field: "catId" });

module.exports = mongoose.model("Category", categorySchema);
