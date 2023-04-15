const express = require("express");
const multer = require("multer");

const {
  uploadTrack,
  getTracks,
  uploadTracksTest,
  generatePayment,
  completePayment
} = require("../controllers/tracks.controller");

const { protectSession } = require("../middlewares/auth.middlewares");

const tracksRouter = express.Router();

tracksRouter.post("/uploadForTests", uploadTracksTest);

tracksRouter.post("/generatePayment", generatePayment);
tracksRouter.post("/completePayment", completePayment);

tracksRouter.use(protectSession);

tracksRouter.get("/", getTracks);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

tracksRouter.post(
  "/upload",
  upload.fields([{ name: "audio" }, { name: "image" }]),
  uploadTrack
);

module.exports = { tracksRouter };
