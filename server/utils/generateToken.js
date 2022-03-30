const jwt = require("jsonwebtoken");

const generateToken = (_id, group, account_type, loginType) =>
  jwt.sign(
    {
      _id,
      group,
      account_type,
      loginType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

module.exports = generateToken;
