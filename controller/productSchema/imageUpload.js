const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const imageUpload = async (req, res) => {
  const path = req.files[0].path;
  await cloudinary.uploader.upload(path, (error, data) => {
    if (error) {
      res.status(400).json({ message: "error" });
    } else {
      fs.unlinkSync(path);
      res.status(200).json({
        message: "success",
        data: { public_id: data.public_id, url: data.secure_url },
      });
    }
  });
};

module.exports = imageUpload;
