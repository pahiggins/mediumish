import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { DeleteForever } from 'styled-icons/material/DeleteForever';
import AuthContext from '../App/AuthContext';
import Votes from '../Votes';

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  border-left: 1px solid rgba(0, 0, 0, 0.1);

  &:first-child {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  &:last-child {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

const Author = styled.div`
  margin-right: 0.5rem;
  font-size: 1.4rem;
  font-weight: 400;
  color: #03a87c;
`;

const StyledDate = styled.div`
  padding-bottom: 0.1rem;
`;

const P = styled.p`
  padding-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.58;
  color: rgba(0, 0, 0, 0.84);
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDeleteForever = styled(DeleteForever)`
  height: ${props => props.inputHeight || '3rem'};
  color: #ccc;
  cursor: pointer;
  transition: color 0.5s;

  &:hover {
    color: rgba(255, 86, 48, 1);
  }
`;

const Comment = ({ comment, updateVotes, articleId, deleteComment }) => {
  return (
    <StyledComment>
      <Header>
        <Author>{comment.username}</Author>
        <StyledDate>
          {moment(comment.created_at).format('MMM D, YYYY')}
        </StyledDate>
      </Header>
      <P>{comment.body}</P>
      <AuthContext.Consumer>
        {({ username }) =>
          username && (
            <Footer>
              <Votes
                votes={comment.votes}
                articleId={articleId}
                commentId={comment.comment_id}
                updateVotes={updateVotes}
                inputHeight="2rem"
              />
              {comment.username === username && (
                <StyledDeleteForever
                  onClick={() => deleteComment(articleId, comment.comment_id)}
                />
              )}
            </Footer>
          )
        }
      </AuthContext.Consumer>
    </StyledComment>
  );
};

export default Comment;
