import React, { Component, Fragment } from 'react';
import { SpinLoader } from 'react-css-loaders';
import throttle from 'lodash.throttle';
import axios from 'axios';
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
  signal = axios.CancelToken.source();

  state = {
    comments: [],
    page: 1,
    loading: true,
    hasMore: true,
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

    this.loadComments(articleId, this.state.page);

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.signal.cancel('API is being canceled');
  }

  loadComments = (articleId, page) => {
    api
      .getCommentsByArticleId(articleId, page, this.signal.token)
      .then(comments => {
        if (comments.length > 0) {
          this.setState(state => ({
            comments: [...state.comments, ...comments],
            page: state.page + 1,
            loading: false,
          }));
        } else {
          this.setState({ loading: false, hasMore: false });
        }
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Error: ', error.message);
        } else {
          this.setState({ error, loading: false });
        }
      });
  };

  updateVotes = (articleId, vote, commentId) => {
    const { comments } = this.state;

    api
      .updateVotesByCommentId(articleId, vote, commentId)
      .then(updatedComment => {
        const updatedComments = comments.map(comment => {
          if (comment.comment_id === updatedComment.comment_id) {
            return {
              ...comment,
              votes: updatedComment.votes,
            };
          } else {
            return comment;
          }
        });

        this.setState({ comments: updatedComments });
      })
      .catch(error => this.setState({ error }));
  };

  addComment = (comment, username) => {
    const { articleId } = this.props;
    const { comments } = this.state;
    const newComment = {
      username,
      body: comment,
    };

    api
      .addCommentByArticleId(articleId, newComment)
      .then(addedComment =>
        this.setState({
          comments: [...comments, addedComment],
        })
      )
      .catch(error => this.setState({ error }));
  };

  deleteComment = (articleId, commentId) => {
    const { comments } = this.state;

    api
      .deleteCommentByArticleId(articleId, commentId)
      .then(() => {
        const updatedComments = comments.filter(
          comment => comment.comment_id !== commentId
        );

        this.setState({
          comments: updatedComments,
        });
      })
      .catch(error => this.setState({ error }));
  };

  handleScroll = throttle(() => {
    const { articleId } = this.props;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.state.hasMore
    ) {
      this.loadComments(articleId, this.state.page);
    }
  }, 1000);
}

export default Comments;
