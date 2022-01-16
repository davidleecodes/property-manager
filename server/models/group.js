const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = Group = mongoose.model("group", groupSchema, "group");
