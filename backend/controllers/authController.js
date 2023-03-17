const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const { getAuth } = require("firebase-admin/auth");

exports.verifyToken = catchAsync(async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken)
    return next(
      new AppError("You do not have permission to perform this action", 403)
    );

  const data = await getAuth().verifyIdToken(accessToken);
  req.user = data;

  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  let user = await User.getUserById({ email: req.user.email });

  if (!user) return next(new AppError("User not found", 404));
  req.user = user;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

exports.login = catchAsync(async (req, res, next) => {
  let user = await User.getUserByEmail(req.user.email);

  if (!user) {
    await User.create({
      email: req.user.email,
      name: req.user.name,
      image: req.user.picture,
      id: req.user.uid,
    });

    user = {
      email: req.user.email,
      name: req.user.name,
      image: req.user.picture,
      id: req.user.uid,
    };
  }

  res.send(user);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
});
