const express = require("express");
const Rout = express.Router();
const classController = require("../controller/class");

Rout.route("/").get(classController.getAll).post(classController.add);
Rout.route("/:id")
  .get(classController.getOne)
  .delete(classController.deleteClass)
  .patch(classController.update);

module.exports = Rout;
