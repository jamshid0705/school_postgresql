const express = require("express");
const Rout = express.Router();
const fanlarController = require("../controller/fanlar");

Rout.route("/").get(fanlarController.getAll).post(fanlarController.add);
Rout.route("/:id")
  .get(fanlarController.getOne)
  .delete(fanlarController.deleteFan)
  .patch(fanlarController.update);

module.exports = Rout;
