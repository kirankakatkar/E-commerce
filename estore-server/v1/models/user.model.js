const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const userSchema = new mongoose.Schema({
  userId: Number,
  name: {
    first: String,
    last: String,
  },
  role: String,
  mobile: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  avatar: { type: String },
  status: Number,
  gender: String,
  dob: { type: Date },
  salary: Number,
  address: {
    street: String,
    city: String,
    country: String,
    pincode: Number,
  },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.SchemaTypes.ObjectId },
});

userSchema.plugin(AutoIncrement, { inc_field: "userId" });

module.exports = mongoose.model("User", userSchema);
