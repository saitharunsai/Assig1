import axios from 'axios';

export const GET = (url) => {
  return axios.get(url);
};