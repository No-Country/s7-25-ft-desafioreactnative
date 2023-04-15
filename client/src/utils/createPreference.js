import axios from 'axios';

const createPreference = async (amount, email) => {
  try {
    console.log("lala")
    const response = await axios.post(
      'https://api.mercadopago.com/oauth/token',
      {
        client_secret: "TEST-3277109332043666-041218-12fc1920124eaad215c3c47400c172d8-1351347836",
        client_id: "TEST-0fabe620-0e76-4309-bacc-edae287426c8",
        grant_type: "authorization_code",
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${"TEST-3277109332043666-041218-12fc1920124eaad215c3c47400c172d8-1351347836"}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    /* throw new Error('Error creating preference'); */
  }
};

export default createPreference;