const express = require("express");
const sachController = require("../controllers/controller_sach");

const router = express.Router();

router.route("/").get(sachController.getAll).post(sachController.create);

router.route("/search").get(sachController.searchByName);

router.route("/sort").get(sachController.sortByCost);

router
  .route("/:id")
  .get(sachController.getById)
  .put(sachController.update)
  .delete(sachController.delete);

module.exports = router;
