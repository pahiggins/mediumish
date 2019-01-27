import React, { Component, Fragment } from 'react';
import { SpinLoader } from 'react-css-loaders';
import axios from 'axios';
import styled from 'styled-components';
import { TrendingUp } from 'styled-icons/boxicons-regular';
import Article from '../Article';
import * as api from '../../utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  background-color: rgba(0, 0, 0, 0.03);

  h2 {
    font-size: 2.2rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 7rem;
  background-color: rgba(3, 168, 124, 0.15);
`;

const StyledTrendingUp = styled(TrendingUp)`
  margin-left: 1rem;
  height: 3rem;
  color: rgba(3, 168, 124, 1);
`;

const Footer = styled.div`
  min-height: 22rem;
  padding: 3rem 3rem 0 3rem;
`;

class ArticlesTrending extends Component {
  signal = axios.CancelToken.source();

  state = {
    articles: [],
    loading: true,
    error: '',
  };

  render() {
    const { articles, loading } = this.state;

    return (
      <Wrapper>
        <Header>
          <h2>{this.props.title}</h2>
          <StyledTrendingUp />
        </Header>
        <Footer>
          {loading ? (
            <SpinLoader
              size={5}
              color="#fff"
              background="rgba(0, 0, 0, 0.005)"
            />
          ) : (
            <Fragment>
              {articles.map(article => (
                <Article
                  key={article.article_id}
                  article={article}
                  size="small"
                />
              ))}
            </Fragment>
          )}
        </Footer>
      </Wrapper>
    );
  }

  componentDidMount() {
    this.loadArticles(null, 1, 'votes', 5);
  }

  loadArticles = (topic, page, sortCriteria = 'created_at', limit = 10) => {
    api
      .getArticles(topic, page, sortCriteria, limit, this.signal.token)
      .then(articles => {
        if (articles.length > 0) {
          this.setState({
            articles,
            loading: false,
          });
        }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          // console.log('Error: ', error.message);
        } else {
          this.setState({ error, loading: false });
        }
      });
  };
}

export default ArticlesTrending;
