const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
    required: true,
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
    required: true,
  },
  tenant_since: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Tenant = mongoose.model("tenant", tenantSchema, "tenant");
