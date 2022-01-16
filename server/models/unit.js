const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
    required: true,
  },
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: "tenant" }],

  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
    // required: true,
  },
});

module.exports = Unit = mongoose.model("unit", unitSchema, "unit");
