const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },

  img_url: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  email: {
    type: String,
  },
  account_type: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

userSchema.virtual("full_Name").get(function () {
  return this.name.first + " " + this.name.last;
});

module.exports = User = mongoose.model("user", userSchema, "user");
