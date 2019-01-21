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
    const { url } = this.props.match;

    return (
      <Section>
        {loading ? (
          <SpinLoader size={5} color="#ccc" />
        ) : (
          articles.map(article => (
            <Article key={article.article_id} url={url} article={article} />
          ))
        )}
      </Section>
    );
  }

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    api
      .getArticles()
      .then(articles => this.setState({ articles, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  };
}
