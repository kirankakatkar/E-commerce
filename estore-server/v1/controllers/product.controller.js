const fs = require("fs");
const ProductModel = require("../models/product.model");

class ProductCtrl {
  static createProduct(req, res) {
    const product = req.body;

    if (req.files)
      product.images = req?.files?.map((file) => `products/${file?.filename}`);

    if (typeof product.categories == "string")
      product.categories = product.categories?.split(",");

    if (typeof product.sizes == "string")
      product.sizes = product.sizes?.split(",");

    if (typeof product.colors == "string")
      product.colors = product.colors?.split(",");

    new ProductModel(product)
      .save()
      .then((result) => {
        res.status(201).send({ message: "Product created", data: result });
      })
      .catch((err) => {
        res.status(500).send({ message: "Product not created", error: err });
      });
  } //createProduct

  static updateProduct(req, res) {
    const { id } = req.params;
    const product = req.body;

    if (req?.files?.length > 0)
      product.images = req?.files?.map((file) => `products/${file?.filename}`);

    if (typeof product.categories == "string")
      product.categories = product.categories?.split(",");

    if (typeof product.sizes == "string")
      product.sizes = product.sizes?.split(",");

    if (typeof product.colors == "string")
      product.colors = product.colors?.split(",");

    ProductModel.findOneAndUpdate({ _id: id }, product)
      .then((result) => {
        if (result.images && req?.files?.length > 0) {
          result.images?.forEach((file) => {
            try {
              fs.unlinkSync(file);
            } catch (err) {
              console.log(err);
            }
          });
        }
        res.status(201).send({ message: "Product updated", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "Product not created", error: err });
      });
  } //updateProduct

  static deleteProduct(req, res) {
    const { id } = req.params;

    ProductModel.findOneAndUpdate({ _id: id }, { status: 2 }, { new: true })
      .then((result) => {
        res.status(200).send({ message: "Product deleted", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "Product not deleted", error: err });
      });
  } //deleteProduct

  static fetchOneProduct(req, res) {
    const { id } = req.params;

    ProductModel.findOne({ _id: id })
      .populate("categories ratings")
      .exec()
      .then((result) => {
        res.status(200).send({
          message: "Product document",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "The product is not available", error: err });
      });
  } //fetchOneProduct

  static fetchAllProduct(req, res) {
    const { status, cat, brand, sortBy, colors, sizes, search, id } = req.query;

    let filter = {};
    if (!status) filter = { $or: [{ status: 0 }, { status: 1 }] };

    if (cat) {
      const catArr = cat.split("_");
      filter.categories = { $in: catArr };
    }
    if (id) {
      const idArr = id.split("_");
      filter._id = { $in: idArr };
    }

    if (colors) {
      const colorArr = colors.split("_");
      filter.colors = { $in: colorArr };
    }

    if (sizes) {
      const sizeArr = sizes.split("_");
      filter.sizes = { $in: sizeArr };
    }

    if (search) {
      filter.title = new RegExp(search, "gi");
    }

    if (status) filter.status = status;
    if (brand) filter.brand = brand;

    // console.log("Filter: ", filter);

    const sortObj = {};
    if (sortBy == "priceAsc") sortObj.price = 1;
    if (sortBy == "priceDesc") sortObj.price = -1;

    ProductModel.find(filter)
      .populate("categories ratings")
      .sort(sortObj)
      .exec()
      .then((result) => {
        res.status(200).send({
          message: "Product List",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "The products are not available", error: err });
      });
  } //fetchAllProduct
}

module.exports = ProductCtrl;
