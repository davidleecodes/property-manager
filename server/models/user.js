const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },

  last_name: {
    type: String,
  },

  image_url: {
    type: String,
  },

  phone_number: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    // unique: true,
  },

  account_type: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  register_date: {
    type: Date,
    default: Date.now,
  },

  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
    required: true,
  },
});

userSchema.virtual("full_Name").get(function () {
  return this.name.first + " " + this.name.last;
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  let test = await bcrypt.compare(enteredPassword, this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  console.log("PRE", this.password);

  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log("END", this.password);
});

module.exports = User = mongoose.model("user", userSchema, "user");
