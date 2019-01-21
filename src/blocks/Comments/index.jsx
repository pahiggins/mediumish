import React, { Component } from 'react';
import { SpinLoader } from 'react-css-loaders';
import Comment from '../Comment';
import Section from '../../elements/Section';
import * as api from '../../utils';

class Comments extends Component {
  state = {
    comments: [],
    loading: true,
    error: '',
  };

  render() {
    const { comments, loading } = this.state;

    return (
      <Section inputWidth="80%" inputMargin="0 auto">
        {loading ? (
          <SpinLoader size={5} color="#ccc" />
        ) : (
          comments.map(comment => (
            <Comment key={comment.comment_id} comment={comment} />
          ))
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
