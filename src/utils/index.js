import axios from 'axios';

const BASE_URL = 'https://nc-news-api-pah.herokuapp.com/api';

export const getArticles = () => {
  return axios
    .get(`${BASE_URL}/articles`)
    .then(res => res.data)
    .catch(err => err);
};

export const getArticlesByTopic = topic => {
  return axios
    .get(`${BASE_URL}/topics/${topic}/articles`)
    .then(res => res.data)
    .catch(err => err);
};

export const getArticleById = id => {
  return axios
    .get(`${BASE_URL}/articles/${id}`)
    .then(res => res.data)
    .catch(err => err);
};

export const getTopics = () => {
  return axios
    .get(`${BASE_URL}/topics`)
    .then(res => res.data)
    .catch(err => err);
};

export const getCommentsByArticleId = id => {
  return axios
    .get(`${BASE_URL}/articles/${id}/comments`)
    .then(res => res.data)
    .catch(err => err);
};
