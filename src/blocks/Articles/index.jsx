import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { SpinLoader } from 'react-css-loaders';
import Article from '../Article';
import Filter from '../Filter';
import Section from '../../elements/Section';
import * as api from '../../utils';

const LeftSide = styled.div`
  width: 66.66%;
`;

const RightSide = styled.div`
  width: 33.34%;
  background-color: #f5f5f5;
`;

export default class Articles extends Component {
  state = {
    articles: [],
    loading: true,
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
              <Filter />
            </RightSide>
          </Fragment>
        )}
      </Section>
    );
  }

  componentDidMount() {
    if (this.props.match.path === '/') {
      this.loadArticles();
    } else if (this.props.match.path === '/topic/:slug') {
      this.loadArticlesByTopic(this.props.match.params.slug);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.url !== this.props.match.url) {
      if (this.props.match.path === '/') {
        this.loadArticles();
      } else if (this.props.match.path === '/topic/:slug') {
        this.loadArticlesByTopic(this.props.match.params.slug);
      }
    }
  }

  loadArticles = () => {
    api
      .getArticles()
      .then(articles => this.setState({ articles, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  };

  loadArticlesByTopic = topic => {
    api
      .getArticlesByTopic(topic)
      .then(articles => this.setState({ articles, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  };

  updateVotes = (articleId, vote) => {
    const { articles } = this.state;

    api
      .updateVotesByArticleId(articleId, vote)
      .then(updatedArticle => {
        const updatedArticles = articles.map(article => {
          if (article.article_id === updatedArticle.article_id) {
            return { ...article, votes: updatedArticle.votes };
          } else {
            return article;
          }
        });

        this.setState({ articles: updatedArticles });
      })
      .catch(error => this.setState({ error }));
  };
}
