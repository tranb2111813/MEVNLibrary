const express = require("express");
const docgia = require("../controllers/controller_docgia");

const router = express.Router();

router.route("/").get(docgia.getAll).post(docgia.create);
router.route("/search").get(docgia.searchByName);
router.route("/sort").get(docgia.sortByHolot);
router
  .route("/:id")
  .get(docgia.getById)
  .put(docgia.update)
  .delete(docgia.delete);

module.exports = router;
