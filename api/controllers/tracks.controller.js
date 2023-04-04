const {
  saveAudioToFirebase,
} = require("../firebase/functions/saveAudioToFirebase");
const { catchAsync } = require("../utils/catchAsync.util");
const { User, Track } = require("../models/initModels");
const { v4: uuidv4 } = require("uuid");

const uploadTrack = catchAsync(async (req, res, next) => {
  try {

    const { originalname, mimetype } = req.file;

    const uuid = uuidv4()

    const response = await saveAudioToFirebase({uuid, ...req.file});

    const { user_id, image_url, price } = JSON.parse(req.body.trackData);

    const user = await User.findByPk(user_id);

    const track = await Track.create({
      id: uuid,
      title: originalname.slice(0, -4),
      download_url: response,
      image_url,
      price
    });

    await user.addTrack(track);

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { uploadTrack };
