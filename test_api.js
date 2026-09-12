require('dotenv').config({ path: './client/.env' });
const axios = require('axios');

async function testApi() {
  const type = 'attractions';
  const sw = { lat: 19.975526810055303, lng: -0.028495788574218753 };
  const ne = { lat: 20.024403424557914, lng: 0.028495788574218753 };

  console.log("Using API Key:", process.env.REACT_APP_RAPIDAPI_KEY ? "Key exists" : "No key found");

  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
    console.log("Success! Data received:", data ? data.length + " items" : "No data array");
  } catch (error) {
    console.error("API Error:", error.response ? error.response.status : error.message);
    if (error.response && error.response.data) {
       console.error("Error details:", error.response.data);
    }
  }
}

testApi();
