import React, { Component } from 'react';
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
          <p> Loading...</p>
        ) : (
            articles.map(({ article_id, title }) => <h2 key={article_id}>{title}</h2>)
          )}
      </Section>
    );
  }

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    api.getArticles()
      .then(articles => this.setState({ articles, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }
}
