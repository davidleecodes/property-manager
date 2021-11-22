const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  city: {
    type: String,
  },
  street_name: {
    type: String,
  },
  street_address: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
});

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
  },
  cost: {
    type: Number,
    default: null,
  },
  image_url: {
    type: String,
  },
  occupied_units: {
    type: Number,
  },
  units: {
    type: Number,
  },
});

module.exports = Property = mongoose.model(
  "property",
  propertySchema,
  "property"
);
