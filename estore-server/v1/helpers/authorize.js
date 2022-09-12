const { verifyToken } = require("./token");

function authorize(roles = []) {
  return (req, res, next) => {
    // access the token from request
    const { authorization: token } = req.headers;

    // validate the token
    const payload = verifyToken(token);

    // if token is not valid then return forbidden response
    if (!payload?.id) {
      res.status(403).send({ message: "Session expired! Login again" });
    } else {
      if (roles.includes(payload?.role)) next();
      //   if current user has no permission then return unauthorized
      else res.status(401).send({ message: "You do not have permissions" });
    }
  };
}

module.exports = authorize;
