const express = require('express');
const multer = require("multer");

const { uploadTrack } = require('../controllers/tracks.controller');

/* const {
	protectSession,
	protectUsersAccount,
	protectAdmin,
} = require('../middlewares/auth.middlewares'); */

const tracksRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

tracksRouter.post('/upload', upload.single("audio"), uploadTrack)

module.exports = { tracksRouter };