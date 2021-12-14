const jwt = require("jsonwebtoken");
const multer = require("multer");
const upload = multer();

const file = (req, res, next) => {
  console.log("FILE", req.file);
  console.log("BODy", req.body);
  // const token = req.cookies.token;
  // if (!token) {
  //   return res.status(401).send("No token, authorization denied");
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //   req.user = decoded;

  //   next();
  // } catch (err) {
  //   res.status(401).send("Token is not valid");
  // }
};

module.exports = file;
