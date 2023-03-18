const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, `${new Date().getTime()}-${file.originalname}`);
//   },
// });
const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

module.exports = upload;
