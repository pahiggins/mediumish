import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledArticle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.8rem;
  background-color: rgba(0, 0, 0, 0.04); /* TODO: Remove */
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Span = styled.span`
  color: rgba(0, 0, 0, 0.54);
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const H2 = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 2.8rem;
  color: rgba(0, 0, 0, 0.84);
`;

const P = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2rem;
  padding: 1rem 0 1.5rem 0;
  color: rgba(0, 0, 0, 0.54);
`;

const Author = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.84);
  padding-bottom: 0.5rem;
`;

const Details = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.54);
  padding-bottom: 1rem;
`;

const Article = ({ article }) => {
  return (
    <StyledArticle>
      <StyledLink to={`/${article.topic}`}>
        <Span>{article.topic.toUpperCase()}</Span>
      </StyledLink>
      <StyledLink to={`articles/${article.article_id}`}>
        <H2>{article.title}</H2>
        <P>Sample body...</P>
        <Author>{article.author}</Author>
        <Details>
          {`${article.created_at} | ${article.votes} votes | ${
            article.comment_count
          } comments`}
        </Details>
      </StyledLink>
    </StyledArticle>
  );
};

export default Article;
