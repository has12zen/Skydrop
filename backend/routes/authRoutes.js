const express = require("express");
const authController = require("../controllers/authController");

const Router = express.Router();

Router.use(authController.verifyToken);

Router.post("/login", authController.login);
Router.post("/logout", authController.logout);

module.exports = Router;
