const router = require("express").Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/category");
  },
  filename: function (req, file, cb) {
    // console.log(file);
    console.log(path.extname(file.originalname));

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const {
  createCategory,
  fetchOneCategory,
  fetchAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.post("/", upload.single("avatar"), createCategory);
router.put("/:id", upload.single("avatar"), updateCategory);
router.delete("/:id", deleteCategory);
router.get("/:id", fetchOneCategory);
router.get("/", fetchAllCategory);

module.exports = router;
