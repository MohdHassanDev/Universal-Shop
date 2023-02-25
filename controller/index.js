const addProducts = require("./productSchema/addProducts");
const deleteproduct = require("./productSchema/deleteproduct");
const editproduct = require("./productSchema/editproduct");
const getAllProducts = require("./productSchema/getAllProducts");
const imageDelete = require("./productSchema/imageDelete");
const imageUpload = require("./productSchema/imageUpload");
const deleteuser = require("./userSchema/deleteuser");
const edituser = require("./userSchema/edituser");
const getallusers = require("./userSchema/getallusers");
const getuserdetails = require("./userSchema/getuserdetails");
const login = require("./userSchema/login");
const Signup = require("./userSchema/signup");

module.exports = {
  Signup,
  login,
  imageDelete,
  imageUpload,
  getallusers,
  deleteuser,
  getAllProducts,
  addProducts,
  deleteproduct,
  editproduct,
  edituser,
  getuserdetails,
};
