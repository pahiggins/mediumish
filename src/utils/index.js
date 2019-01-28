import axios from 'axios';

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
  const {
    data: { articles },
  } = await axios.get(url, { cancelToken });

  return articles;
};

export const getArticleById = async articleId => {
  const {
    data: { article },
  } = await axios.get(`${BASE_URL}/articles/${articleId}`);

  return article;
};

export const getTopics = async () => {
  const {
    data: { topics },
  } = await axios.get(`${BASE_URL}/topics`);

  return topics;
};

export const addCommentByArticleId = async (articleId, newComment) => {
  const {
    data: { comment },
  } = await axios.post(
    `${BASE_URL}/articles/${articleId}/comments`,
    newComment
  );

  return comment;
};

export const getCommentsByArticleId = async (articleId, page, cancelToken) => {
  const {
    data: { comments },
  } = await axios.get(`${BASE_URL}/articles/${articleId}/comments?p=${page}`, {
    cancelToken,
  });

  return comments;
};

export const updateVotesByArticleId = async (articleId, vote) => {
  const {
    data: { article },
  } = await axios.patch(`${BASE_URL}/articles/${articleId}`, {
    inc_votes: vote,
  });

  return article;
};

export const updateVotesByCommentId = async (articleId, vote, commentId) => {
  const {
    data: { comment },
  } = await axios.patch(
    `${BASE_URL}/articles/${articleId}/comments/${commentId}`,
    {
      inc_votes: vote,
    }
  );

  return comment;
};

export const addArticle = async (title, body, username, topic) => {
  const {
    data: { article },
  } = await axios.post(`${BASE_URL}/topics/${topic}/articles`, {
    title,
    body,
    username,
  });

  return article;
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
  const {
    data: { user },
  } = await axios.get(`${BASE_URL}/users/${username}`);

  return user;
};

export const addTopic = async (slug, description) => {
  const {
    data: { topic },
  } = await axios.post(`${BASE_URL}/topics`, {
    slug,
    description,
  });

  return topic;
};
