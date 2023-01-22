const cloudinary = require("cloudinary").v2;

const imageUpload = async (req, res) => {
  await cloudinary.uploader.upload(req.files[0].path, (error, data) => {
    if (error) {
      res.status(400).json({ message: "error" });
    } else {
      res.status(200).json({
        message: "success",
        data: { public_id: data.public_id, url: data.secure_url },
      });
    }
  });
};

module.exports = imageUpload;
