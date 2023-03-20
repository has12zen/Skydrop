const dotenv = require("dotenv");
dotenv.config();
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const { getAuth } = require("firebase-admin/auth");

const signToken = (token) => {
  console.log({token})
  return jwt.sign({ token }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.verifyToken = catchAsync(async (req, res, next) => {
  let { accessToken } = req.body;
  if (!accessToken) {
    accessToken = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    accessToken=accessToken.token;
  }

  console.log({ accessToken });
  req.accessToken=accessToken;

  if (!accessToken)
    return next(
      new AppError("You do not have permission to perform this action", 403)
    );

  const data = await getAuth().verifyIdToken(accessToken);
  req.user = data;

  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  let user = await User.getUserByEmail(req.user.email);

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
  const token = signToken(req.accessToken);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.header("x-forwarded-proto") === "https",
  });
  res.send(user);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
});
