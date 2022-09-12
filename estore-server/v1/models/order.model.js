const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema({
  orderId: Number,
  customer: { type: mongoose.SchemaTypes.ObjectId, ref: "Customer" },
  items: [
    {
      product: mongoose.SchemaTypes.ObjectId,
      quantity: Number,
      size: String,
      color: String,
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    country: String,
    pincode: Number,
  },
  paymentMode: String,
  totalAmount: Number,
  status: Number,
  createdAt: { type: Date, default: Date.now },
});

orderSchema.plugin(AutoIncrement, { inc_field: "orderId" });

module.exports = mongoose.model("Order", orderSchema);
