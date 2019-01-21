import React from 'react';

const ArticleDetails = ({
  match: {
    params: { article_id },
  },
}) => {
  return <div>{article_id}</div>;
};

export default ArticleDetails;
