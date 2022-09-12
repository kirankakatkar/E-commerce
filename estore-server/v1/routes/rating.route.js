const router = require("express").Router();

const {
  createRating,
  updateRating,
  deleteRating,
  fetchOneRating,
  fetchAllRating,
} = require("../controllers/rating.controller");

router.post("/", createRating);
router.put("/:id", updateRating);
router.delete("/:id", deleteRating);
router.get("/:id", fetchOneRating);
router.get("/", fetchAllRating);

module.exports = router;
