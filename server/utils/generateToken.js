const jwt = require("jsonwebtoken");

const generateToken = (_id, group, account_type) =>
  jwt.sign(
    {
      _id,
      group,
      account_type,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

module.exports = generateToken;
