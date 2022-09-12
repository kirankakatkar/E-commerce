const CategoryModel = require("../models/category.model");

class CategoryCtrl {
  static createCategory(req, res) {
    const category = req.body;

    if (req?.file) category.avatar = `category/${req?.file?.filename}`;

    if (typeof category.parentCategories == "string")
      category.parentCategories = category.parentCategories.split(",");

    new CategoryModel(category)
      .save()
      .then((result) => {
        CategoryModel.updateMany(
          { _id: { $in: category.parentCategories } },
          { $push: { subCategories: result._id } },
          (err, result) => {
            console.log("sub categories updated: ");
            console.table(result);
          }
        );

        res.status(201).send({ message: "Category created", data: result });
      })
      .catch((err) => {
        res.status(500).send({ message: "Category not created", error: err });
      });
  } //createCategory

  static updateCategory(req, res) {
    const { id } = req.params;
    const category = req.body;

    if (req?.file) category.avatar = `category/${req?.file?.filename}`;
    
    if (typeof category.parentCategories == "string")
      category.parentCategories = category.parentCategories.split(",");

    CategoryModel.findOneAndUpdate({ _id: id }, category, { new: true })
      .then((result) => {
        res.status(201).send({ message: "Category updated", data: result });
      })
      .catch((err) => {
        console.log('error', err)
        res.status(404).send({ message: "Category not created", error: err });
      });
  } //updateCategory

  static deleteCategory(req, res) {
    const { id } = req.params;

    CategoryModel.findOneAndUpdate({ _id: id }, { status: 2 }, { new: true })
      .then((result) => {
        res.status(200).send({ message: "Category deleted", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "Category not deleted", error: err });
      });
  } //deleteCategory

  static fetchOneCategory(req, res) {
    const { id } = req.params;

    CategoryModel.findOne({ _id: id })
      .populate("subCategories parentCategories")
      .exec()
      .then((result) => {
        res.status(200).send({
          message: "Category document",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "The category is not available", error: err });
      });
  } //fetchOneCategory

  static fetchAllCategory(req, res) {
    const { status } = req.query;

    let filter = {};

    if (!status) filter = { $or: [{ status: 0 }, { status: 1 }] };

    if (status) filter.status = status;

    CategoryModel.find(filter)
      .populate("subCategories parentCategories")
      .exec()
      .then((result) => {
        res.status(200).send({
          message: "Category List",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "The categories are not available", error: err });
      });
  } //fetchAllCategory
}

module.exports = CategoryCtrl;
