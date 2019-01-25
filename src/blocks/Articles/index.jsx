import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { SpinLoader } from 'react-css-loaders';
import throttle from 'lodash.throttle';
import Article from '../Article';
import Sort from '../Sort';
import Section from '../../elements/Section';
import * as api from '../../utils';

const LeftSide = styled.div`
  width: 66.66%;
`;

const RightSide = styled.div`
  margin-left: 5.6rem;
  max-width: 32.8rem;
  width: 33.34%;
`;

export default class Articles extends Component {
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
        {loading ? (
          <SpinLoader size={5} color="#ccc" />
        ) : (
          <Fragment>
            <LeftSide>
              {articles.map(article => (
                <Article
                  key={article.article_id}
                  article={article}
                  updateVotes={this.updateVotes}
                />
              ))}
            </LeftSide>
            <RightSide>
              <Sort title="Sort" handleSort={this.handleSort} />
            </RightSide>
          </Fragment>
        )}
      </Section>
    );
  }

  componentDidMount() {
    if (this.props.match.path === '/') {
      this.loadArticles(this.state.page);
    } else if (this.props.match.path === '/topic/:slug') {
      this.loadArticlesByTopic(this.state.page, this.props.match.params.slug);
    }

    window.addEventListener('scroll', throttle(this.handleScroll, 1000));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.setState({ articles: [], page: 1, hasMore: true }, () => {
        if (this.props.match.path === '/') {
          this.loadArticles(this.state.page);
        } else if (this.props.match.path === '/topic/:slug') {
          this.loadArticlesByTopic(
            this.state.page,
            this.props.match.params.slug
          );
        }
      });
    }
  }

  componentWillUnmount() {
    console.log('Unmounted');
    window.removeEventListener('scroll', this.handleScroll);
  }

  loadArticles = (page, sortCriteria) => {
    api
      .getArticles(page, sortCriteria)
      .then(articles => {
        if (articles.length > 1) {
          this.setState(state => ({
            articles: [...state.articles, ...articles],
            page: state.page + 1,
            loading: false,
          }));
        } else {
          this.setState({ hasMore: false });
        }
      })
      .catch(error => this.setState({ error, loading: false }));
  };

  loadArticlesByTopic = (page, topic) => {
    api
      .getArticlesByTopic(page, topic)
      .then(articles => {
        if (articles.length > 1) {
          this.setState(state => ({
            articles: [...state.articles, ...articles],
            page: state.page + 1,
            loading: false,
          }));
        } else {
          this.setState({ hasMore: false });
        }
      })
      .catch(error => this.setState({ error, loading: false }));
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
    if (this.props.match.path === '/') {
      this.loadArticles(sortCriteria);
    } else if (this.props.match.path === '/topic/:slug') {
      this.loadArticlesByTopic(this.props.match.params.slug, sortCriteria);
    }
  };

  handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.state.hasMore
    ) {
      if (this.props.match.path === '/') {
        console.log(this.props.match.path, 'Fetching more for home...');
        this.loadArticles(this.state.page + 1);
      } else if (this.props.match.path === '/topic/:slug') {
        console.log(this.props.match.path, 'Fetching more for topic...');
        this.loadArticlesByTopic(
          this.state.page + 1,
          this.props.match.params.slug
        );
      }
    }
  };
}
