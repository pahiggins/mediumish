import React, { Component, Fragment } from 'react';
import { SpinLoader } from 'react-css-loaders';
import axios from 'axios';
import throttle from 'lodash.throttle';
import styled from 'styled-components';
import Article from '../Article';
import Sort from '../Sort';
import Section from '../../elements/Section';
import * as api from '../../utils';

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 66.66%;
`;

const RightSide = styled.div`
  margin-left: 5.6rem;
  max-width: 32.8rem;
  width: 33.34%;
`;

const PlaceholderText = styled.p`
  font-size: 1.6rem;
`;

class Articles extends Component {
  signal = axios.CancelToken.source();

  state = {
    articles: [],
    page: 1,
    loading: true,
    hasMore: true,
    error: '',
  };

  render() {
    const { articles, loading } = this.state;

    return (
      <Section flexDirection="row">
        <LeftSide>
          {loading ? (
            <SpinLoader size={5} color="#ccc" />
          ) : (
            <Fragment>
              {articles.map(article => (
                <Article
                  key={article.article_id}
                  article={article}
                  updateVotes={this.updateVotes}
                />
              ))}
              {articles.length === 0 && (
                <PlaceholderText>
                  There are no articles for this topic.
                </PlaceholderText>
              )}
            </Fragment>
          )}
        </LeftSide>
        <RightSide>
          <Sort title="Sort" handleSort={this.handleSort} />
        </RightSide>
      </Section>
    );
  }

  componentDidMount() {
    if (this.props.match.path === '/') {
      this.loadArticles(this.state.page);
    } else if (this.props.match.path === '/topic/:slug') {
      this.loadArticlesByTopic(this.state.page, this.props.match.params.slug);
    }

    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.setState(
        { articles: [], page: 1, loading: true, hasMore: true },
        () => {
          if (this.props.match.path === '/') {
            this.loadArticles(this.state.page);
          } else if (this.props.match.path === '/topic/:slug') {
            this.loadArticlesByTopic(
              this.state.page,
              this.props.match.params.slug
            );
          }
        }
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.signal.cancel('API is being canceled');
  }

  loadArticles = (page, sortCriteria = 'created_at') => {
    api
      .getArticles(page, sortCriteria, this.signal.token)
      .then(articles => {
        if (articles.length > 0) {
          this.setState(state => ({
            articles: [...state.articles, ...articles],
            page: state.page + 1,
            loading: false,
          }));
        } else {
          this.setState({ hasMore: false });
        }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Error: ', error.message);
        } else {
          this.setState({ error, loading: false });
        }
      });
  };

  loadArticlesByTopic = (page, topic, sortCriteria = 'created_at') => {
    api
      .getArticlesByTopic(page, topic, sortCriteria, this.signal.token)
      .then(articles => {
        if (articles.length > 0) {
          this.setState(state => ({
            articles: [...state.articles, ...articles],
            page: state.page + 1,
            loading: false,
          }));
        } else {
          this.setState({ hasMore: false });
        }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Error: ', error.message);
        } else {
          this.setState({ error, loading: false });
        }
      });
  };

  updateVotes = (articleId, vote) => {
    const { articles } = this.state;

    api
      .updateVotesByArticleId(articleId, vote)
      .then(updatedArticle => {
        const updatedArticles = articles.map(article => {
          if (article.article_id === updatedArticle.article_id) {
            return {
              ...article,
              votes: updatedArticle.votes,
            };
          } else {
            return article;
          }
        });

        this.setState({
          articles: updatedArticles,
        });
      })
      .catch(error => this.setState({ error }));
  };

  handleSort = sortCriteria => {
    // if (this.props.match.path === '/') {
    //   this.loadArticles(1, sortCriteria);
    // } else if (this.props.match.path === '/topic/:slug') {
    //   this.loadArticlesByTopic(1, this.props.match.params.slug, sortCriteria);
    // }
    // TODO: Fix this.
  };

  handleScroll = throttle(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.state.hasMore
    ) {
      if (this.props.match.path === '/') {
        this.loadArticles(this.state.page);
      } else if (this.props.match.path === '/topic/:slug') {
        this.loadArticlesByTopic(this.state.page, this.props.match.params.slug);
      }
    }
  }, 1000);
}

export default Articles;
