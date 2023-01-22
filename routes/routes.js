const express = require("express");
const {
  Signup,
  login,
  imageUpload,
  imageDelete,
  getallusers,
  deleteuser,
  getAllProducts,
  addProducts,
  deleteproduct,
  editproduct,
  edituser,
  getuserdetails,
} = require("../controller");
const authToken = require("../middleware/middleware");
const router = express.Router();
const upload = require("../utils/multer");

// get
router.get("/api/getallusers/:id", authToken, getallusers);
router.get("/api/getallproducts", getAllProducts);
router.get("/api/getuserdetails/:id", authToken, getuserdetails);

// post
router.post("/api/signup", Signup);
router.post("/api/login", login);
router.post("/api/addproducts/:id", authToken, addProducts);
router.post(
  "/api/imageUpload/:id",
  authToken,
  upload.any("image"),
  imageUpload
);

// put
router.put("/api/editproduct/:id", authToken, editproduct);
router.put("/api/edituser/:id", authToken, edituser);

// delete
router.delete("/api/deleteuser/:id", deleteuser);
router.delete("/api/deleteproduct/:id", deleteproduct);

module.exports = router;
