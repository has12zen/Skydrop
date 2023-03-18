const Req = require("../models/requestModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

db = require("../index");

exports.findByUserId = catchAsync(async (req, res, next) => {
  const reqRef = db.collection("requests");
  const query = reqRef.where("userId", "==", req.params.id);
  const reqs = await query.get();
  const data = reqs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  res.send(data);
});

exports.getUserRequests = catchAsync(async (req, res, next) => {
  const reqRef = db.collection("requests");
  const query = reqRef.where("userId", "==", req.user.id);
  const reqs = await query.get();
  const data = reqs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  res.send(data);
});

exports.create = catchAsync(async (req, res, next) => {
  const reqData = {
    userId: req.user.id,
    weight: req.body.weight,
    status: "Pending",
    createdTime: new Date(),
    pickup: req.body.pickup,
    destination: req.body.destination,
    receiverName: req.body.receiverName,
    receiverPhone: req.body.receiverPhone,
    receiverEmail: req.body.receiverEmail,
  };

  const collectionRef = db.collection("requests");
  const docRef = await collectionRef.add(reqData);

  console.log("Request created with ID:", docRef.id);
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
  const docRef = db.collection("requests");
  const reqs = await docRef.get();
  const data = reqs.docs.map((doc) => doc.data());
  console.log(data);

  res.status(200).json({
    status: "Success",
    data: {
      data,
    },
  });
});

exports.getActiveRequests = catchAsync(async (req, res, next) => {
  const docRef = db.collection("requests");
  const reqs = await docRef
    .where("userId", "==", req.user.id)
    .where("status", "==", "Pending")
    .get();
  const data = reqs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  console.log(data);

  res.send(data);
});
