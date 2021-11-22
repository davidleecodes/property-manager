const jwt = require("jsonwebtoken");

const decodeToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = decodeToken;
