const Lease = require("../models/lease");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

//@route GET /lease
//get list of leases
exports.getLeases = asyncHandler(async (req, res) => {
  try {
    const LeaseList = await Lease.find()
      .populate({
        path: "tenant",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "property",
      });
    if (LeaseList) {
      res.status(200).json(LeaseList);
    } else {
      res.status(404).json({ message: "lease Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//@route GET /lease/:id
//get lease for id
exports.getLeaseForId = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const lease = await Lease.findById(id)
      .populate({
        path: "tenant",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "property",
      });

    if (lease) {
      res.status(200).json(lease);
    } else {
      res.status(404).json({ message: "lease Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
