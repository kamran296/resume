const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const path = require("path");
const PDFDocument = require("pdfkit");
mongoose
  .connect(process.env.DB)
  .then((con) => {
    console.log("Database connected successfully!!");
  })
  .catch((err) => {
    console.log("Error connecting the database!!", err);
  });

// routes
const resumeRoutes = require("./router/resume");
const userRoutes = require("./router/user");

app.use(cors());
app.use(express.json());
app.use("/api/resume", resumeRoutes);
app.use("/api/v1/user", userRoutes);

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../frontend/dist");
app.use(express.static(buildPath));

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
