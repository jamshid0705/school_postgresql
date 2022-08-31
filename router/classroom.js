const express = require("express");
const Rout = express.Router();
const classRoomController = require("../controller/classroom");

Rout.route("/").get(classRoomController.getAll).post(classRoomController.add);
Rout.route("/:id")
  .get(classRoomController.getOne)
  .delete(classRoomController.deleteClassRoom)
  .patch(classRoomController.update);

module.exports = Rout;
