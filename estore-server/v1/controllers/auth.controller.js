const UserModel = require("../models/user.model");
const { compare } = require("../helpers/encryption");
const { createToken, verifyToken } = require("../helpers/token");
const UserCtrl = require("./user.controller");

class AuthCtrl {
  static adminLogin(req, res) {
    const { email, password } = req.body;
    UserModel.findOne({ email: email, status: 1 })
      .then((result) => {
        if (!result) {
          res.status(404).send({
            error: null,
            message: "User is disabled or not avaialble",
          });
        } else {
          if (result.password && compare(password, result.password)) {
            // email and password are correct
            // generate a token (Json Web Token) - JWT
            const accessToken = createToken(
              {
                id: result._id,
                role: result.role,
                ua: req.headers["user-agent"],
              },
              60 * 10
            );
            const refreshToken = createToken(
              {
                id: result._id,
                role: result.role,
                ua: req.headers["user-agent"],
              },
              60 * 25
            );
            // add the token in response header
            res.set("x-token", accessToken);
            res.set("x-refresh", refreshToken);

            // send the response
            res.status(200).send({
              data: result,
              message: "Login Successful",
            });
          } else {
            res.status(404).send({
              error: null,
              message: "Invaid Password",
            });
          }
        }
      })
      .catch((e) => {
        res
          .status(404)
          .send({ error: e, message: "Could not login, Try again!" });
      });
  } // adminLogin

  static validateToken(req, res) {
    const { token } = req.body;
    const payload = verifyToken(token);
    if (payload && payload.id && payload.ua == req.headers["user-agent"]) {
      // token is valid
      res
        .status(200)
        .send({ message: "Valid token", data: { id: payload.id } });
    } else {
      // token is invalid
      // forbidden
      res.status(403).send({ message: "Invalid token", error: null });
      // unauthorized
    }
  } //validateToken

  
  // refreshToken
  static refreshToken(req, res) {
    const { refreshT } = req.body;

    const { id, role, ua } = verifyToken(refreshT);

    if (!id) {
      // refresh token is expired
      res.status(440).send({ message: "Session expired", error: null });
    } else {
      // access token
      const access = createToken({ id, role, ua }, 600);
      const refresh = createToken({ id, role, ua }, 60 * 25);

      res.status(200).send({ message: "Tokens", data: { access, refresh } });
    }
  }
}

module.exports = AuthCtrl;
