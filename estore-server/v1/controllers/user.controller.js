const UserModel = require("../models/user.model");
const { encrypt } = require("../helpers/encryption");
const _ = require("lodash");

class UserCtrl {
  // pick a specific fields
  static pickUser(obj) {
    return _.pick(obj, [
      "_id",
      "userId",
      "name",
      "mobile",
      "email",
      "role",
      "gender",
      "status",
      "address",
      "dob",
      "avatar",
      "salary",
      "createdAt",
      "createdBy",
    ]);
  }

  // createUser
  static createUser(req, res) {
    const data = req.body;

    if (data?.password) data.password = encrypt(data.password);
    if (req?.file) data.avatar = `user-avatar/${req?.file?.filename}`;

    new UserModel(data)
      .save()
      .then((result) => {
        res
          .status(201)
          .send({ message: "User created", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ message: "Could not created the user", error: err });
      });
  }

  // updateUser
  static updateUser(req, res) {
    const data = req.body;
    const { id } = req.params;
    if (data?.password) data.password = encrypt(data.password);
    if (req?.file) data.avatar = `user-avatar/${req?.file?.filename}`;

    UserModel.findOneAndUpdate({ _id: id }, data, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({ message: "User updated", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not updated the user", error: err });
      });
  }

  // deleteUser
  static deleteUser(req, res) {
    const { id } = req.params;
    UserModel.findOneAndUpdate({ _id: id }, { status: 2 }, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({ message: "User deleted", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not deleted the user", error: err });
      });
  }

  // fetchOneUser
  static fetchOneUser(req, res) {
    // http://localhost:8888/api/v1/users/fs4654f6s4fs4fs64
    const { id } = req.params;
    UserModel.findOne({ _id: id, $or: [{ status: 0 }, { status: 1 }] })
      .then((result) => {
        res
          .status(200)
          .send({ message: "User record", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not found the user", error: err });
      });
  }

  // fetchAllUser
  static fetchAllUser(req, res) {
    // http://localhost:8888/api/v1/users?gender=female&status=1&role=admin
    const { gender, status, role } = req.query;

    let filter = {};
    if (!status) filter = { $or: [{ status: 0 }, { status: 1 }] };

    if (gender) filter.gender = gender;
    if (status) filter.status = status;
    if (role) filter.role = role;
    if (!role) filter.role = "admin";

    UserModel.find(filter)
      .then((result) => {
        res.status(200).send({
          message: "User list",
          data: _.map(result, UserCtrl.pickUser),
        });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not found the users", error: err });
      });
  }
}

module.exports = UserCtrl;
