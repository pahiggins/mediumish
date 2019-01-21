import React from 'react';
import { Link } from 'react-router-dom';

const Article = ({ url, article }) => {
  return (
    <div>
      <Link to={`/${article.topic}`}>{article.topic.toUpperCase()}</Link>
      <Link to={`${url}/${article.article_id}`}>{article.title}</Link>
    </div>
  );
};

export default Article;
