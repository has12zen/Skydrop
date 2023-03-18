const Req = require("../models/requestModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

db = require("../index");

exports.findByUserId = catchAsync(async (req, res, next) => {
  const reqRef = db.collection("requests");
  const query = reqRef.where("userId", "==", req.params.id);
  const reqs = await query.get();
  const data = reqs.docs.map((doc) => doc.data());

  res.status(200).json({
    status: "Success",
    data: {
      reqs: data,
    },
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const reqData = {
    userId: req.user.id,
    weight: req.body.data.weight,
    status: "Pending",
    createdTime: new Date(),
    pickup: req.body.data.pickup,
    destination: req.body.data.destination,
  };

  const collectionRef = db.collection("requests");
  const docRef = await collectionRef.add(reqData);
  console.log("Document written with ID:", docRef.id);
  const reqDoc = await docRef.get();
  const data = reqDoc.data();

  res.status(201).json({
    status: "Success",
    data: {
      doc: data,
    },
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const docRef = db.collection("requests").doc(req.params.id);
  await docRef.delete();
  console.log("Deleted Successfully");

  res.status(200).json({
    status: "Success",
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const docRef = db.collection("requests").doc(req.params.id);
  await docRef.update(req.body);
  console.log("Updated Successfully");

  res.status(204).json({
    status: "Success",
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  // const docRef = db.collection("req")
});
