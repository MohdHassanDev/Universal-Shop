const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

const imageUpload = async (req, res) => {
  const stream = await cloudinary.uploader.upload_stream(
    {
      folder: "demo",
    },
    (error, data) => {
      if (error) return console.error(error);
      res.status(200).json({
        message: "success",
        data: { public_id: data.public_id, url: data.secure_url },
      });
    }
  );
  streamifier.createReadStream(req.file.buffer).pipe(stream);
};

module.exports = imageUpload;
