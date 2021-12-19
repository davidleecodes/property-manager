const mongoose = require("mongoose");

const maintenaceSchema = new mongoose.Schema({
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
});

module.exports = Maintenance = mongoose.model(
  "maintenance",
  maintenaceSchema,
  "maintenance"
);
