const jwt = require("jsonwebtoken");
require("dotenv").config();

class Authentication {
  static authenticate(req, res, next) {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
      if (error) return res.sendStatus(403);
      req.userId = decoded?.userId;

      next();
    });
  }
}

module.exports = Authentication;
