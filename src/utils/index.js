import axios from 'axios';

const BASE_URL = 'https://nc-news-api-pah.herokuapp.com/api';

export const getArticles = () => {
  return axios
    .get(`${BASE_URL}/articles`)
    .then(res => res.data)
    .catch(res => res);
};

export const getTopics = () => {
  return axios
    .get(`${BASE_URL}/topics`)
    .then(res => res.data)
    .catch(res => res);
};
