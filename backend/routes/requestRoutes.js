const express = require("express");
const Router = express.Router();
const requestController = require("../controllers/requestController");
const authController = require("../controllers/authController");

Router.use(authController.verifyToken);
Router.use(authController.protect);

Router.get("/", requestController.getUserRequests);
Router.post("/create", requestController.create);
Router.get("/active", requestController.getActiveRequests);
Router.delete("/:id", requestController.delete);
Router.patch("/:id", requestController.update);
Router.get("/getAll", requestController.getAll);
Router.get("/:id", requestController.findByUserId);

module.exports = Router;
