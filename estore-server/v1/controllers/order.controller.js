const OrderModel = require("../models/order.model");
const CustomerModel = require("../models/customer.model");

class OrderCtrl {
  // createOrder
  static createOrder(req, res) {
    const order = req.body;

    new OrderModel(order)
      .save()
      .then((result) => {
        if (result._id) {
          CustomerModel.findOneAndUpdate(
            { id: order.customer },
            { $push: { orders: result._id } },
            (err, custResult) => {
              if (err) console.log(err);
              else console.log("Added order id to customer", custResult.name);
            }
          );
        }
        res.status(201).send({ message: "Order created", data: result });
      })
      .catch((err) => {
        res.status(500).send({ message: "Order not created", error: err });
      });
  }

  // updateOrder
  static updateOrder(req, res) {
    const { id } = req.params;
    const order = req.body;

    OrderModel.findOneAndUpdate({ _id: id }, order, { new: true })
      .then((result) => {
        res.status(200).send({
          message: "Order updated",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Order is not updated", error: err });
      });
  }

  // deleteOrder
  static deleteOrder(req, res) {
    const { id } = req.params;

    OrderModel.findOneAndUpdate({ _id: id }, { status: 2 }, { new: true })
      .then((result) => {
        res.status(200).send({
          message: "Order deleted",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not deleted the order", error: err });
      });
  }

  // fetchOneOrder
  // http://localhost:8888/api/v1/orders/fs4654f6s4fs4fs64
  static fetchOneOrder(req, res) {
    const { id } = req.params;
    OrderModel.findOne({ _id: id })
      .populate("customer")
      .exec()
      .then((result) => {
        res.status(200).send({
          message: "Order document",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "The order is not available", error: err });
      });
  }

  // fetchAllOrder
  // http://localhost:8888/api/v1/orders?status=1
  static fetchAllOrder(req, res) {
    const { custId, status } = req.query;

    let filter = {};
    
    if (custId) filter.customer = custId;
    if (status) filter.status = status;

    OrderModel.find(filter)
      .populate("customer")
      .exec()
      .then((result) => {
        res.status(200).send({
          message: "Order list",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not found the orders", error: err });
      });
  }
}

module.exports = OrderCtrl;
