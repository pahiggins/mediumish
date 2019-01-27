import axios from 'axios';
import slug from 'slug';

const BASE_URL = 'https://nc-news-api-pah.herokuapp.com/api';

export const getArticles = async (
  topic,
  page,
  sortCriteria = 'created_at',
  limit,
  cancelToken
) => {
  const url = topic
    ? `${BASE_URL}/topics/${topic}/articles?sort_by=${sortCriteria}&p=${page}&limit=${limit}`
    : `${BASE_URL}/articles?sort_by=${sortCriteria}&p=${page}&limit=${limit}`;
  const { data } = await axios.get(url, { cancelToken });

  return data;
};

export const getArticleById = async articleId => {
  const { data } = await axios.get(`${BASE_URL}/articles/${articleId}`);

  return data;
};

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);

  return data;
};

export const addCommentByArticleId = async (articleId, comment) => {
  const { data } = await axios.post(
    `${BASE_URL}/articles/${articleId}/comments`,
    comment
  );

  return data;
};

export const getCommentsByArticleId = async (articleId, page, cancelToken) => {
  const { data } = await axios.get(
    `${BASE_URL}/articles/${articleId}/comments?p=${page}`,
    {
      cancelToken,
    }
  );

  return data;
};

export const updateVotesByArticleId = async (articleId, vote) => {
  const { data } = await axios.patch(`${BASE_URL}/articles/${articleId}`, {
    inc_votes: vote,
  });

  return data;
};

export const updateVotesByCommentId = async (articleId, vote, commentId) => {
  const { data } = await axios.patch(
    `${BASE_URL}/articles/${articleId}/comments/${commentId}`,
    {
      inc_votes: vote,
    }
  );

  return data;
};

export const addArticle = async (title, body, username, topic) => {
  const { data } = await axios.post(`${BASE_URL}/topics/${topic}/articles`, {
    title,
    body,
    username,
  });

  return data;
};

export const deleteArticle = async articleId => {
  const { data } = await axios.delete(`${BASE_URL}/articles/${articleId}`);

  return data;
};

export const deleteCommentByArticleId = async (articleId, commentId) => {
  const { data } = await axios.delete(
    `${BASE_URL}/articles/${articleId}/comments/${commentId}`
  );

  return data;
};

export const validateUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);

  return data;
};

export const addTopic = async (slug, description) => {
  const { data } = await axios.post(`${BASE_URL}/topics`, {
    slug,
    description,
  });

  return data;
};
