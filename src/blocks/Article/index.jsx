import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import AuthContext from '../App/AuthContext';
import Votes from '../Votes';

const StyledArticle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4.8rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Span = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.54);
`;

const H2 = styled.h2`
  margin: 0.5rem 0;
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 1.3;
  color: rgba(0, 0, 0, 0.84);
`;

const P = styled.p`
  padding-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.3;
  color: rgba(0, 0, 0, 0.54);
`;

const Author = styled.div`
  padding-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: #03a87c;
`;

const Details = styled.div`
  padding-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
`;

const Article = ({
  article: {
    topic,
    author,
    article_id,
    title,
    created_at,
    comment_count,
    votes,
  },
  updateVotes,
}) => {
  return (
    <StyledArticle>
      <StyledLink to={`/topic/${topic}`}>
        <Span>{topic.toUpperCase()}</Span>
      </StyledLink>
      <StyledLink to={`/${author}/${article_id}`}>
        <H2>{title}</H2>
        <P>
          SEAFOOD fraud is a serious global problem', begins a recent report
          from Oceana, an NGO. Reviewing over 200 studies in 55 countries, the
          report...
        </P>
        <Author>{author}</Author>
        <Details>{`${moment(created_at).format(
          'MMM D, YYYY'
        )} | ${comment_count} comments`}</Details>
      </StyledLink>
      <AuthContext.Consumer>
        {({ status }) =>
          status === 'signedIn' && (
            <Votes
              votes={votes}
              articleId={article_id}
              updateVotes={updateVotes}
              inputHeight="2rem"
            />
          )
        }
      </AuthContext.Consumer>
    </StyledArticle>
  );
};

export default Article;
