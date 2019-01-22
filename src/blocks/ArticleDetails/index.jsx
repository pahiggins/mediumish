import React, { Component, Fragment } from 'react';
import { SpinLoader } from 'react-css-loaders';
import styled from 'styled-components';
import Comments from '../Comments';
import Section from '../../elements/Section';
import * as api from '../../utils';

const H2 = styled.h2`
  font-family: 'Libre Baskerville', serif;
  font-size: 3.8rem;
  font-weight: 400;
  line-height: 1.3;
  color: rgba(0, 0, 0, 0.84);
`;

const P = styled.p`
  padding: 2.5rem 0 2.5rem 0;
  font-size: 2.1rem;
  font-weight: 400;
  line-height: 1.58;
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
            <P>{article.body}</P>
            <Comments articleId={article.article_id} />
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
}

export default ArticleDetails;
