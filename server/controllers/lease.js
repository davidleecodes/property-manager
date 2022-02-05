const Lease = require("../models/lease");
const asyncHandler = require("express-async-handler");
const decodeToken = require("../utils/decodeToken");

//@route GET /lease
//get list of leases
exports.getLeases = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const groupId = req.user.group;
  const acctType = req.user.account_type;

  try {
    let query = {
      group: groupId,
    };
    if (acctType === "tenant") {
      const tenant = await Tenant.findOne({ user: userId });
      query.tenant = tenant._id;
    }

    const LeaseList = await Lease.find(query)
      .populate({
        path: "tenant",
        populate: [{ path: "user" }, { path: "unit" }],
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
  const userId = req.user._id;
  const groupId = req.user.group;
  const acctType = req.user.account_type;

  try {
    let query = {
      _id: id,
      group: groupId,
    };
    if (acctType === "tenant") {
      const tenant = await Tenant.findOne({ user: userId });
      query.tenant = tenant._id;
    }
    const lease = await Lease.findOne(query)
      .populate({
        path: "tenant",
        populate: [{ path: "user" }, { path: "unit" }],
      })
      .populate({
        path: "property",
        populate: { path: "units" },
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

exports.newLease = asyncHandler(async (req, res) => {
  const groupId = req.user.group;

  const { tenant, property, monthly_rent, start_date, end_date } = JSON.parse(
    req.body.data
  );

  const lease = await Lease.create({
    tenant,
    property,
    monthly_rent,
    start_date,
    end_date,
    group: groupId,
  });

  if (lease) {
    res.status(201).json({
      success: { lease },
    });
  } else {
    res.status(404);
    throw new Error("Invalid request data");
  }
});

//@route Patch /lease/edit/:id
//patch lease
exports.editLease = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { tenant, property, monthly_rent, start_date, end_date } = JSON.parse(
    req.body.data
  );
  const data = {
    tenant,
    property,
    monthly_rent,
    start_date,
    end_date,
  };

  const lease = await Lease.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (lease) {
    res.status(201).json({
      success: { lease },
    });
  } else {
    res.status(404);
    throw new Error("Invalid request data");
  }
});

//@route Delete /lease/delete/:id
//delete lease
exports.deleteLease = asyncHandler(async (req, res) => {
  console.log("DELETE");
  const leaseId = req.params.id;
  const groupId = req.user.group;
  let lease;

  if (leaseId) {
    lease = await Lease.findOneAndDelete({
      _id: leaseId,
      group: groupId,
    });
  }
  if (!lease) {
    res.status(404);
    throw new Error("Invalid requests");
  }

  res.status(200).json({
    success: { lease },
  });
});
