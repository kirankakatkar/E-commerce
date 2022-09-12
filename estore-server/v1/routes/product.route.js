const router = require("express").Router();
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
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
  createProduct,
    fetchOneProduct,
    fetchAllProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");

router.post("/",upload.array("images"), createProduct);
router.put("/:id",upload.array("images"),  updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", fetchOneProduct);
router.get("/", fetchAllProduct);

module.exports = router;
