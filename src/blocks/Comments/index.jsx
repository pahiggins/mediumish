import React, { Component, Fragment } from 'react';
import { SpinLoader } from 'react-css-loaders';
import styled from 'styled-components';
import AuthContext from '../App/AuthContext';
import Comment from '../Comment';
import CommentAdd from '../CommentAdd';
import Section from '../../elements/Section';
import * as api from '../../utils';

const H3 = styled.h3`
  margin-bottom: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.68);
`;

const P = styled.p`
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.84);
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
          <AuthContext.Consumer>
            {({ username }) => (
              <Fragment>
                <div>
                  <H3>Comments</H3>
                  {comments.length === 0 ? (
                    <Fragment>
                      <P>There are no comments for this article.</P>
                    </Fragment>
                  ) : (
                    comments.map(comment => (
                      <Comment
                        key={comment.comment_id}
                        comment={comment}
                        updateVotes={this.updateVotes}
                        articleId={this.props.articleId}
                        deleteComment={this.deleteComment}
                      />
                    ))
                  )}
                </div>
                {username && <CommentAdd addComment={this.addComment} />}
              </Fragment>
            )}
          </AuthContext.Consumer>
        )}
      </Section>
    );
  }

  componentDidMount() {
    const { articleId } = this.props;

    this.loadComments(articleId);
  }

  loadComments = articleId => {
    api
      .getCommentsByArticleId(articleId)
      .then(comments => this.setState({ comments, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  };

  updateVotes = (articleId, vote, commentId) => {
    api
      .updateVotesByCommentId(articleId, vote, commentId)
      .then(comment => this.loadComments(articleId))
      .catch(error => this.setState({ error }));
  };

  addComment = comment => {
    const { articleId } = this.props;
    const { comments } = this.state;
    const newComment = {
      username: 'cooljmessy', // TODO: Make username dynamic and check correct rendering on page.
      body: comment,
    };

    api
      .addCommentByArticleId(articleId, newComment)
      .then(addedComment => {
        this.setState({
          comments: [...comments, { ...addedComment }],
        });
      })
      .catch(error => this.setState({ error }));
  };

  deleteComment = (articleId, commentId) => {
    api
      .deleteCommentByArticleId(articleId, commentId)
      .then(() => this.loadComments(articleId))
      .catch(error => this.setState({ error }));
  };
}

export default Comments;
