const { storage } = require("../services.js");

async function saveAudioToFirebase({uuid, buffer, originalname, mimetype }) {
  try {
    const fileName = `${uuid + originalname}`;

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
