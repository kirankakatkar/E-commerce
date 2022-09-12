const RatingModel = require("../models/rating.model");
const CustomerModel = require("../models/customer.model");
const ProductModel = require("../models/product.model");

class RatingCtrl {
  // createRating
  static createRating(req, res) {
    const rating = req.body;

    new RatingModel(rating)
      .save()
      .then((result) => {
        if (result._id) {
          // add the rating id in the customer collection
          CustomerModel.findOneAndUpdate(
            { id: rating.customer },
            { $push: { rating: result._id } },
            (err, custResult) => {
              if (err) console.log(err);
              else console.log("Added Rating id to customer", custResult.name);
            }
          );

          // add the rating id in the product collection
          ProductModel.findOneAndUpdate(
            { id: rating.product },
            { $push: { rating: result._id } },
            (err, prodResult) => {
              if (err) console.log(err);
              else console.log("Added rating id to product", prodResult.name);
            }
          );
        }
        res.status(201).send({ message: "Rating created", data: result });
      })
      .catch((err) => {
        res.status(500).send({ message: "Rating not created", error: err });
      });
  }

  // updateRating
  static updateRating(req, res) {
    const { id } = req.params;
    const rating = req.body;

    RatingModel.findOneAndUpdate({ _id: id }, rating, { new: true })
      .then((result) => {
        res.status(200).send({
          message: "Rating updated",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Rating is not updated", error: err });
      });
  }

  // deleteRating
  static deleteRating(req, res) {
    const { id } = req.params;

    RatingModel.findOneAndUpdate({ _id: id }, { status: 2 }, { new: true })
      .then((result) => {
        res.status(200).send({
          message: "Rating deleted",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not deleted the Rating", error: err });
      });
  }

  // fetchOneRating
  // http://localhost:8888/api/v1/rating/fs4654f6s4fs4fs64
  static fetchOneRating(req, res) {
    const { id } = req.params;
    RatingModel.findOne({ _id: id })
      .populate("customer product")
      .exec()
      .then((result) => {
        res.status(200).send({
          message: "Rating document",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "The rating is not available", error: err });
      });
  }

  // fetchAllRating
  // http://localhost:8888/api/v1/rating?status=1
  static fetchAllRating(req, res) {
    const { custId, status, prodId } = req.query;

    let filter = {};

    if (custId) filter.customer = custId;
    if (prodId) filter.product = prodId;
    if (status) filter.status = status;

    RatingModel.find(filter)
      .populate("customer product")
      .exec()
      .then((result) => {
        res.status(200).send({
          message: "Rating list",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not found the rating", error: err });
      });
  }
}

module.exports = RatingCtrl;
