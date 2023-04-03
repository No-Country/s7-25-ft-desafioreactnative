const { storage } = require("../services.js");
const { v4: uuidv4 } = require("uuid");

async function saveAudioToFirebase({ buffer, originalname, mimetype }) {
  try {
    const fileName = `${uuidv4() + originalname}`;

    const file = storage.bucket().file(fileName);

    const result = await file.save(buffer, {
      metadata: {
        contentType: mimetype,
      },
    });

    const signedUrl = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-2100' 
      });

    console.log(`Audio saved to Firebase Storage with name ${originalname}`);
    return signedUrl[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = { saveAudioToFirebase };
