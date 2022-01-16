const mongoose = require("mongoose");
const Unit = require("./unit");
const Tenant = require("./tenant");

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
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
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "unit",
      },
    ],
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "group",
    // required: true,
  },
});

propertySchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const units = await Unit.find({
      property: doc._id,
    });
    const tenants = await Tenant.find({
      property: doc._id,
    });
    units.forEach((unit) => {
      unit.remove();
    });
    tenants.forEach((tenant) => {
      tenant.remove();
    });
    console.log("Unit delete result: ", units.length);
    console.log("Tenant delete result: ", tenants.length);
  }
});

module.exports = Property = mongoose.model(
  "property",
  propertySchema,
  "property"
);
