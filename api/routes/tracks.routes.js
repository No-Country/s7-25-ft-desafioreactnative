const express = require("express");
const multer = require("multer");

const {
  uploadTrack,
  getTracks,
  uploadTracksTest,
  purchaseTrack
} = require("../controllers/tracks.controller");

const { protectSession } = require("../middlewares/auth.middlewares");

const tracksRouter = express.Router();

tracksRouter.post("/uploadForTests", uploadTracksTest);

tracksRouter.post("/purchase", purchaseTrack);

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
