const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const authorize = require("../helpers/authorize");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/user-avatar");
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
  createUser,
  fetchOneUser,
  fetchAllUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.post("/", upload.single("avatar"), createUser);
router.put("/:id", upload.single("avatar"), updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", fetchOneUser);
router.get("/", authorize(["superadmin", "admin"]), fetchAllUser);

module.exports = router;
