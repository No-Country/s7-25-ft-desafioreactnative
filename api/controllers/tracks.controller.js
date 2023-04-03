const {
  saveAudioToFirebase,
} = require("../firebase/functions/saveAudioToFirebase");
const { catchAsync } = require("../utils/catchAsync.util");
const { User, Track } = require('../models/initModels');

const uploadTrack = catchAsync(async (req, res, next) => {
  try {
    const { buffer, originalname, mimetype } = req.file;

    const response = await saveAudioToFirebase(req.file);

    const { user_id, title } = JSON.parse(req.body.trackData);

    const user = await User.findByPk(user_id);

	const track = await Track.create({
		title: title.slice(0, -4),
		download_url: response
	  });

	await user.addTrack(track);

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
	console.log(error)
  }
});

module.exports = { uploadTrack };
