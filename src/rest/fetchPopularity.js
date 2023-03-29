import axios from 'axios';
import { BASE_URL } from './constants';

/**
 * @description return a list of gms ranked by popularity
 * @returns {*} Array of gms by username
 */
export const fetchPopularity = async () => {
  const response = {};

  await axios
    .get(`${BASE_URL}/popularity`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
