import React, { Component, Fragment } from 'react';
import { SpinLoader } from 'react-css-loaders';
import styled from 'styled-components';
import AuthContext from '../App/AuthContext';
import UserProfile from '../UserProfile';
import Comments from '../Comments';
import Votes from '../Votes';
import Section from '../../elements/Section';
import Button from '../../elements/Button';
import * as api from '../../utils';

const H2 = styled.h2`
  font-family: 'Gentium Book Basic', serif;
  font-size: 3.8rem;
  font-weight: 400;
  line-height: 1.3;
  color: rgba(0, 0, 0, 0.84);
`;

const P = styled.p`
  padding: 2.5rem 0 2.5rem 0;
  font-size: 2rem;
  font-weight: 300;
  line-height: 1.58;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 9.6rem;
`;

class ArticleDetails extends Component {
  state = {
    article: {},
    loading: true,
    error: '',
  };

  render() {
    const { article, loading } = this.state;

    return (
      <Section inputWidth="80%" inputMargin="0 auto">
        {loading ? (
          <SpinLoader size={5} color="#ccc" />
        ) : (
          <Fragment>
            <H2>{article.title}</H2>
            <UserProfile
              author={article.author}
              createdAt={article.created_at}
            />
            <P>{article.body}</P>
            <AuthContext.Consumer>
              {({ username }) => (
                <Fragment>
                  {username && (
                    <Votes
                      votes={article.votes}
                      updateVotes={this.updateVotes}
                      articleId={article.article_id}
                      inputMarginBottom="2.5rem"
                    />
                  )}
                  <Comments articleId={article.article_id} />
                  {username && (
                    <Buttons>
                      <Button
                        type="submit"
                        backgroundColorHover={'rgba(255, 86, 48, 1)'}
                        borderColor={'rgba(255, 86, 48, 1)'}
                        color={'rgba(255, 86, 48, 1)'}
                        colorHover={'#fff'}
                        backgroundColorSelect={'rgba(255, 86, 48, 0.8)'}
                        borderColorSelect={'rgba(255, 86, 48, 0.8)'}
                        onClick={this.deleteArticleById}
                      >
                        Delete Article
                      </Button>
                    </Buttons>
                  )}
                </Fragment>
              )}
            </AuthContext.Consumer>
          </Fragment>
        )}
      </Section>
    );
  }

  componentDidMount() {
    const { articleId } = this.props.match.params;

    this.loadArticle(articleId);
  }

  loadArticle = id => {
    api
      .getArticleById(id)
      .then(article => this.setState({ article, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  };

  updateVotes = (articleId, vote) => {
    api
      .updateVotesByArticleId(articleId, vote)
      .catch(error => this.setState({ error }));

    this.setState(({ article }) => ({
      article: { ...article, votes: article.votes + vote },
    }));
  };

  deleteArticleById = () => {
    const { article_id } = this.state.article;

    api
      .deleteArticle(article_id)
      .then(() => this.props.history.push(`/`))
      .catch(error => this.setState({ error, loading: false }));
  };
}

export default ArticleDetails;
