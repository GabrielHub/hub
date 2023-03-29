import axios from 'axios';
import { BASE_URL } from './constants';

export const fetchLookup = async () => {
  await axios
    .get(`${BASE_URL}/lookup`)
    .then((res) => {
      // eslint-disable-next-line no-console
      console.log(res);
    })
    .catch((error) => {
      return { error };
    });
};

export default {};
