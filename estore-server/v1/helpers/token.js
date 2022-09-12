const jwt = require("jsonwebtoken");

function createToken(payload, expiry = 60 * 60) {
  try {
    return jwt.sign(payload, process.env.KEY, { expiresIn: expiry });
  } catch (e) {
    console.log(e);
  }
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.KEY);
  } catch (e) {
    console.log(e);
  }
}

module.exports = { createToken, verifyToken };
