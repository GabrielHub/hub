const axios = require('axios');

const BASE_URL = 'https://startplaying.games/api';

const fetchGM = async (username) => {
  const response = {};
  try {
    const { data } = await axios.get(`${BASE_URL}/detect-magic/gms?page=0&username=${username}`);
    response.data = data;
  } catch (error) {
    response.error = error;
  }
  return response;
};

module.exports = fetchGM;
