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

  // account_type: {
  //   type: String,
  // },

  is_tenant: {
    type: Boolean,
  },

  admin_type: {
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
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.post(["findOneAndDelete", "remove"], async function (doc) {
  console.log(doc);
  if (doc) {
    //todo: check if user is also admin before delete
    const tenant = await Tenant.findOne({
      user: doc._id,
    });
    tenant.remove();
  }
});

module.exports = User = mongoose.model("user", userSchema, "user");
