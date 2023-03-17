const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

db = require("../index");

exports.findById = catchAsync(async (req, res, next) => {
  const droneRef = db.collection("drones").doc(req.params.id);
  const droneDoc = await droneRef.get();
  const data = droneDoc.data();

  res.status(200).json({
    status: "Success",
    data: {
      data,
    },
  });
});

exports.findByReqId = catchAsync(async (req, res, next) => {
  const droneRef = db.collection("drones");
  const query = droneRef.where("reqId", "==", req.params.id).limit(1);
  const drones = await query.get();
  const data = drones.empty ? null : drones.docs[0].data();

  res.status(200).json({
    status: "Success",
    data: {
      data,
    },
  });
});

exports.getAllInfo = catchAsync(async (req, res, next) => {
  const droneRef = db.collection("drones");
  const drones = await droneRef.get();
  const data = drones.docs.map((doc) => doc.data());
  console.log({ data });

  res.status(200).json({
    status: "Success",
    data: {
      data,
    },
  });
});

exports.addDrone = catchAsync(async (req, res, next) => {
  const droneData = {
    reqId: "",
    latitute: null,
    longitude: null,
    speed: null,
    available: true,
    working: true,
  };

  const droneRef = db.collection("drones");
  const docRef = await droneRef.add(droneData);
  console.log("Doc added with id", docRef.id);
  const droneDoc = await docRef.get();
  const data = droneDoc.data();

  res.status(201).json({
    status: "Success",
    data: {
      data,
    },
  });
});

exports.updateDrone = catchAsync(async (req, res, next) => {
  const docRef = db.collection("drones").doc(req.params.id);
  await docRef.update(req.body);
  console.log("Updated Successfully");

  res.status(204).json({
    status: "Success",
  });
});