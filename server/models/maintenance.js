const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tenant",
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  status: {
    type: String,
  },
  location: {
    type: String,
  },
  media: {
    type: [],
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
    // required: true,
  },
});

module.exports = Maintenance = mongoose.model(
  "maintenance",
  maintenanceSchema,
  "maintenance"
);
