import React, { Component } from 'react';
import { SpinLoader } from 'react-css-loaders';
import Article from '../Article';
import Section from '../../elements/Section';
import * as api from '../../utils';

export default class Articles extends Component {
  state = {
    articles: [],
    loading: true,
    error: '',
  };

  render() {
    const { articles, loading } = this.state;

    return (
      <Section>
        {loading ? (
          <SpinLoader size={5} color="#ccc" />
        ) : (
          articles.map(article => (
            <Article
              key={article.article_id}
              article={article}
              updateVotes={this.updateVotes}
            />
          ))
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
