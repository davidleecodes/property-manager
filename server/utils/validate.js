const { check, validationResult } = require("express-validator");

exports.validateRegister = [
  // check("email", "Please enter a valid email address").isEmail(),
  check(
    "password",
    "Please enter a password with 3 or more characters"
  ).isLength({
    min: 2,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateLogin = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
