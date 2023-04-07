const {
  saveFileToFirebase,
} = require("../firebase/functions/saveAudioToFirebase");
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require('../utils/appError.util');
const { User, Track } = require("../models/initModels");
const { v4: uuidv4 } = require("uuid");

const uploadTrack = catchAsync(async (req, res, next) => {
  try {
    const { originalname } = req.files.audio[0];
    const { user_id, price } = JSON.parse(req.body.trackData);

    const uuid = uuidv4();

    const [audioResponse, imageResponse, user] = await Promise.all([
      saveFileToFirebase({ uuid, ...req.files.audio[0] }),
      req.files.image
        ? saveFileToFirebase({ uuid, ...req.files.image[0] })
        : undefined,
      User.findByPk(user_id),
    ]);

    const track = await Track.create({
      id: uuid,
      title: originalname.slice(0, -4),
      download_url: audioResponse,
      image_url: imageResponse,
      price,
    });

    await user.addTrack(track);

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

const getTracks = catchAsync(async (req, res, next) => {
    try {
      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      console.log(error)
    }
});

module.exports = { uploadTrack, getTracks };
