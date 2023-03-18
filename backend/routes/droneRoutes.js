const express = require("express");
const Router = express.Router();

const droneController = require("../controllers/droneController");

Router.get("/", droneController.getAllInfo);
Router.get("/request/:id", droneController.findByReqId);
Router.get("/:id", droneController.findById);
Router.post("/add", droneController.addDrone);
Router.patch("/:id", droneController.updateDrone);

module.exports = Router;
