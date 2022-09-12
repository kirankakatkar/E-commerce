const CustomerModel = require("../models/customer.model");
const RatingModel = require("../models/rating.model");
const { encrypt } = require("../helpers/encryption");
const _ = require("lodash");

class CustomerCtrl {
  // pick a specific fields
  static pickCustomer(obj) {
    return _.pick(obj, [
      "_id",
      "customerId",
      "name",
      "mobile",
      "email",
      "gender",
      "status",
      "address",
      "dob",
      "avatar",
      "orders",
      "rating",
      "cardDetails",
      "createdAt",
      "createdBy",
    ]);
  }

  // createCustomer
  static createCustomer(req, res) {
    const data = req.body;

    if (data?.password) data.password = encrypt(data.password);
    if (req?.file) data.avatar = `customer-avatar/${req?.file?.filename}`;

    new CustomerModel(data)
      .save()
      .then((result) => {
        res
          .status(201)
          .send({
            message: "Customer created",
            data: CustomerCtrl.pickCustomer(result),
          });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not created the Customer", error: err });
      });
  }

  // updateCustomer
  static updateCustomer(req, res) {
    const data = req.body;
    const { id } = req.params;
    if (data?.password) data.password = encrypt(data.password);
    if (req?.file) data.avatar = `customer-avatar/${req?.file?.filename}`;

    CustomerModel.findOneAndUpdate({ _id: id }, data, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({
            message: "Customer updated",
            data: CustomerCtrl.pickCustomer(result),
          });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not updated the Customer", error: err });
      });
  }

  // deleteCustomer
  static deleteCustomer(req, res) {
    const { id } = req.params;
    CustomerModel.findOneAndUpdate({ _id: id }, { status: 2 }, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({
            message: "Customer deleted",
            data: CustomerCtrl.pickCustomer(result),
          });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not deleted the Customer", error: err });
      });
  }

  // fetchOneCustomer
  static fetchOneCustomer(req, res) {
    // http://localhost:8888/api/v1/customers/fs4654f6s4fs4fs64
    const { id } = req.params;
    CustomerModel.findOne({ _id: id, $or: [{ status: 0 }, { status: 1 }] })
      .populate("orders rating")
      .exec()
      .then((result) => {
        res
          .status(200)
          .send({
            message: "Customer record",
            data: CustomerCtrl.pickCustomer(result),
          });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not found the Customer", error: err });
      });
  }

  // fetchAllCustomer
  static fetchAllCustomer(req, res) {
    // http://localhost:8888/api/v1/customers?gender=female&status=1&role=admin
    const { gender, status, role } = req.query;

    let filter = {};
    if (!status) filter = { $or: [{ status: 0 }, { status: 1 }] };

    if (gender) filter.gender = gender;
    if (status) filter.status = status;
    if (role) filter.role = role;

    CustomerModel.find(filter)
      .populate("orders rating")
      .exec()
      .then((result) => {
        res.status(200).send({
          message: "Customer list",
          data: _.map(result, CustomerCtrl.pickCustomer),
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not found the Customers", error: err });
      });
  }
}

module.exports = CustomerCtrl;
