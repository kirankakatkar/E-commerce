const router = require("express").Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/customer-avatar");
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
  createCustomer,
  fetchOneCustomer,
  fetchAllCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");

router.post("/", upload.single("avatar"), createCustomer);
router.put("/:id", upload.single("avatar"), updateCustomer);
router.delete("/:id", deleteCustomer);
router.get("/:id", fetchOneCustomer);
router.get("/", fetchAllCustomer);

module.exports = router;
