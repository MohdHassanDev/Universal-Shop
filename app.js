const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const path = require("path");
const router = require("./routes/routes");
const cloudinary = require("cloudinary").v2;
const cloudinaryConfig = require("./utils/cloudinary");
cloudinary.config(cloudinaryConfig);

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "https://universal-shop.vercel.app/", credentials: true }));
app.use(router);

const DB_URI = process.env.DB;

mongoose.connect(DB_URI);
mongoose.connection.on("connected", () => console.log("MongoDB connnected"));
mongoose.connection.on("error", (error) => console.log(error));

// server side rendering
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./view", "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "./view", "frontend", "build", "index.html")
    );
  });
}

app.listen(PORT, () => console.log("Server running on port " + PORT));
