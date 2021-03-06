import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
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
                <H3>Comments</H3>
                {username && <CommentAdd addComment={this.addComment} />}
                {comments.map(comment => (
                  <Comment
                    key={comment.comment_id}
                    comment={comment}
                    updateVotes={this.updateVotes}
                    articleId={this.props.articleId}
                    deleteComment={this.deleteComment}
                  />
                ))}
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
    this.signal.cancel('API is being cancelled');
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
        } else {
          this.setState({ error, loading: false, hasMore: false });
        }
      });
  };

  updateVotes = (articleId, vote, commentId) => {
    const { comments } = this.state;

    api
      .updateVotesByCommentId(articleId, vote, commentId)
      .catch(error => this.setState({ error }));

    const updatedComments = comments.map(comment => {
      if (comment.comment_id === commentId) {
        return {
          ...comment,
          votes: comment.votes + vote,
        };
      } else {
        return comment;
      }
    });

    this.setState({ comments: updatedComments });
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
          comments: [addedComment, ...comments],
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
    const { loading, hasMore } = this.state;

    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading &&
      hasMore
    ) {
      this.loadComments(articleId, this.state.page);
    }
  }, 1000);
}

Comments.propTypes = {
  articleId: PropTypes.number.isRequired,
};

export default Comments;
