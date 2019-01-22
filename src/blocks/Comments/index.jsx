import React, { Component, Fragment } from 'react';
import { SpinLoader } from 'react-css-loaders';
import styled from 'styled-components';
import Comment from '../Comment';
import Section from '../../elements/Section';
import * as api from '../../utils';

const H3 = styled.h3`
  margin-bottom: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.68);
`;

class Comments extends Component {
  state = {
    comments: [],
    loading: true,
    error: '',
  };

  render() {
    const { comments, loading } = this.state;

    return (
      <Section inputWidth="80%" inputMargin="0 auto 9.6rem auto">
        {loading ? (
          <SpinLoader size={5} color="#ccc" />
        ) : (
          <Fragment>
            <H3>Comments</H3>
            {comments.map(comment => (
              <Comment key={comment.comment_id} comment={comment} />
            ))}
          </Fragment>
        )}
      </Section>
    );
  }

  componentDidMount() {
    const { articleId } = this.props;

    this.loadComments(articleId);
  }

  loadComments = id => {
    api
      .getCommentsByArticleId(id)
      .then(comments => this.setState({ comments, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  };
}

export default Comments;
