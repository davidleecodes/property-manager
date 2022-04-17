const jwt = require("jsonwebtoken");

const generateToken = (_id, group, loggedin_acct) =>
  jwt.sign(
    {
      _id,
      group,
      loggedin_acct,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

module.exports = generateToken;
