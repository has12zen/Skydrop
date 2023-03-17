const express = require("express");
// const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const Router = express.Router();

// Router.use(authController.verifyToken);

Router.get("/:id", userController.getUserById);

// Router.use(authController.protect);

Router.patch(
  "/:id",
  // authController.restrictTo("admin"),
  userController.updateUser
);

Router.route("/").patch(
  userController.putUserInParams,
  userController.updateUser
);

module.exports = Router;
