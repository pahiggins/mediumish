import axios from 'axios';

const BASE_URL = 'https://nc-news-api-pah.herokuapp.com/api';

export const getArticles = sortCriteria => {
  let url;

  if (sortCriteria === 'Date') {
    url = `${BASE_URL}/articles?sort_ascending=true&sort_by=created_at`;
  } else if (sortCriteria === 'Comments') {
    url = `${BASE_URL}/articles?sort_ascending=true&sort_by=comment_count`;
  } else if (sortCriteria === 'Votes') {
    url = `${BASE_URL}/articles?sort_ascending=true&sort_by=votes`;
  } else {
    url = `${BASE_URL}/articles?sort_ascending=true`;
  }

  // Pick up here - need to figure out comment_count. Perhaps the API needs amending?

  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => err);
};

export const getArticlesByTopic = topic => {
  return axios
    .get(`${BASE_URL}/topics/${topic}/articles?sort_ascending=true`)
    .then(res => res.data)
    .catch(err => err);
};

export const getArticleById = articleId => {
  return axios
    .get(`${BASE_URL}/articles/${articleId}`)
    .then(res => res.data)
    .catch(err => err);
};

export const getTopics = () => {
  return axios
    .get(`${BASE_URL}/topics`)
    .then(res => res.data)
    .catch(err => err);
};

export const addCommentByArticleId = (articleId, comment) => {
  return axios
    .post(`${BASE_URL}/articles/${articleId}/comments`, comment)
    .then(res => res.data)
    .catch(err => err);
};

export const getCommentsByArticleId = articleId => {
  return axios
    .get(`${BASE_URL}/articles/${articleId}/comments`)
    .then(res => res.data)
    .catch(err => err);
};

export const updateVotesByArticleId = (articleId, vote) => {
  return axios
    .patch(`${BASE_URL}/articles/${articleId}`, {
      inc_votes: vote,
    })
    .then(res => res.data)
    .catch(err => err);
};

export const updateVotesByCommentId = (articleId, vote, commentId) => {
  return axios
    .patch(`${BASE_URL}/articles/${articleId}/comments/${commentId}`, {
      inc_votes: vote,
    })
    .then(res => res.data)
    .catch(err => err);
};

export const addArticle = (title, body, username, topic) => {
  return axios
    .post(`${BASE_URL}/topics/${topic}/articles`, {
      title,
      body,
      username,
    })
    .then(res => res.data)
    .catch(err => err);
};

export const deleteArticle = articleId => {
  return axios
    .delete(`${BASE_URL}/articles/${articleId}`)
    .then(res => res.data)
    .catch(err => err);
};

export const deleteCommentByArticleId = (articleId, commentId) => {
  return axios
    .delete(`${BASE_URL}/articles/${articleId}/comments/${commentId}`)
    .then(res => res.data)
    .catch(err => err);
};

export const validateUser = username => {
  return axios
    .get(`${BASE_URL}/users/${username}`)
    .then(res => res.data)
    .catch(err => err);
};

export const addTopic = (slug, description) => {
  return axios
    .post(`${BASE_URL}/topics`, { slug, description })
    .then(res => res.data)
    .catch(err => err);
};
