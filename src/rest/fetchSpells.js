import axios from 'axios';

const baseURL = 'https://startplaying.games/api';

export const fetchSpells = (page) => {
  return axios
    .get(`${baseURL}/detect-magic/spells?page=${page}`)
    .then((res) => {
      return { data: res.data };
    })
    .catch((error) => {
      return { error };
    });
};

export default {};
