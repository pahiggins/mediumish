import React, { Component, Fragment } from 'react';
import { SpinLoader } from 'react-css-loaders';
import axios from 'axios';
import throttle from 'lodash.throttle';
import styled from 'styled-components';
import Article from '../Article';
import Sort from '../Sort';
import Section from '../../elements/Section';
import * as api from '../../utils';
import ArticlesTrending from '../ArticlesTrending';

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 66.66%;
`;

const RightSide = styled.div`
  margin-left: 5.6rem;
  max-width: 32.8rem;
  width: 33.34%;
`;

const PlaceholderText = styled.p`
  margin-top: 4.8rem;
  font-size: 1.6rem;
  text-align: center;
`;

class Articles extends Component {
  signal = axios.CancelToken.source();

  state = {
    articles: [],
    page: 1,
    loading: true,
    hasMore: true,
    sortCriteria: 'created_at',
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
          <ArticlesTrending title="Popular on Mediumish" />
        </RightSide>
      </Section>
    );
  }

  componentDidMount() {
    this.props.match.params.slug
      ? this.loadArticles(this.props.match.params.slug, this.state.page)
      : this.loadArticles(null, this.state.page);

    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      this.setState(
        {
          articles: [],
          page: 1,
          loading: true,
          hasMore: true,
          sortCriteria: 'created_at',
          error: '',
        },
        () => {
          this.props.match.params.slug
            ? this.loadArticles(this.props.match.params.slug, this.state.page)
            : this.loadArticles(null, this.state.page);
        }
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.signal.cancel('API is being canceled');
  }

  loadArticles = (topic, page, sortCriteria = 'created_at', limit = 10) => {
    api
      .getArticles(topic, page, sortCriteria, limit, this.signal.token)
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
        } else {
          this.setState({ error, loading: false, hasMore: false });
        }
      });
  };

  updateVotes = (articleId, vote) => {
    const { articles } = this.state;

    api
      .updateVotesByArticleId(articleId, vote)
      .catch(error => this.setState({ error }));

    const updatedArticles = articles.map(article => {
      if (article.article_id === articleId) {
        return {
          ...article,
          votes: article.votes + vote,
        };
      } else {
        return article;
      }
    });

    this.setState({
      articles: updatedArticles,
    });
  };

  handleSort = sortCriteria => {
    this.setState(
      {
        articles: [],
        page: 1,
        loading: true,
        hasMore: true,
        sortCriteria,
        error: '',
      },
      () => {
        this.props.match.params.slug
          ? this.loadArticles(
              this.props.match.params.slug,
              this.state.page,
              this.state.sortCriteria
            )
          : this.loadArticles(null, this.state.page, this.state.sortCriteria);
      }
    );
  };

  handleScroll = throttle(() => {
    const { page, loading, hasMore, sortCriteria } = this.state;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading &&
      hasMore
    ) {
      if (this.props.match.path === '/' && loading === false) {
        this.loadArticles(null, page, sortCriteria);
      } else if (
        this.props.match.path === '/topic/:slug' &&
        loading === false
      ) {
        this.loadArticles(this.props.match.params.slug, page, sortCriteria);
      }
    }
  }, 1000);
}

export default Articles;
