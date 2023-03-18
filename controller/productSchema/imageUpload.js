const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const imageUpload = async (req, res) => {
  await runMiddleware(req, res, uploadMiddleware);
  console.log(req.file.buffer);
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

// const imageUpload = async (req, res) => {
//   const path = req.files[0].path;
//   await cloudinary.uploader.upload(path, (error, data) => {
//     if (error) {
//       res.status(400).json({ message: "error" });
//     } else {
//       fs.unlinkSync(path);
//       res.status(200).json({
//         message: "success",
//         data: { public_id: data.public_id, url: data.secure_url },
//       });
//     }
//   });
// };

module.exports = imageUpload;
