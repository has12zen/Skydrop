const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.putCreatedBy = (req, res, next) => {
  console.log(req.body, "backend");
  if (!req.body.isPrivate) req.body.createdBy = req.user._id;

  next();
};

exports.putUserInParams = catchAsync(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

exports.logout = catchAsync(async (req, res, next) => {});

exports.getMe = catchAsync(async (req, res, next) => {
  let user = await User.getUserByEmail({ email: req.user.email });

  if (!user) {
    user = User.create({
      email: req.user.email,
      name: req.user.given_name,
      img: req.user.picture,
    })
      .then(() => {
        console.log("New user saved to Firestore!");
      })
      .catch((error) => {
        console.error("Error saving user:", error);
      });
  }

  res.send(user);

  // next();
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const doc = await User.findById(req.params.id);
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      doc: doc.data(),
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const msg = await User.findByIdAndUpdate(req.params.id, req.body);
  if (msg === "error") {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    message: "User data updated.",
  });
});
