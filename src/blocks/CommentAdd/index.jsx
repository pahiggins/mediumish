import React, { Component } from 'react';
import styled from 'styled-components';
import AuthContext from '../App/AuthContext';
import Button from '../../elements/Button';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  margin-top: 3rem;
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  resize: none;
  font-size: 1.6rem;
  transition: border 0.5s;

  &::placeholder {
    color: rgba(0, 0, 0, 0.54);
    transition: color 0.5s;
  }

  &:focus {
    outline: none;
    border: 1px solid rgba(3, 168, 124, 1);

    &::placeholder {
      color: rgba(0, 0, 0, 0.24);
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

class CommentAdd extends Component {
  state = {
    comment: '',
  };

  render() {
    const { comment } = this.state;

    return (
      <AuthContext.Consumer>
        {({ username }) => (
          <Form onSubmit={e => this.handleSubmit(e, username)}>
            <TextArea
              type="text"
              id="comment"
              value={comment}
              onChange={this.handleChange}
              placeholder="Add a comment..."
              rows="5"
              cols="33"
            />
            <Buttons>
              <Button
                type="submit"
                backgroundColorHover={'rgba(3, 168, 124, 1)'}
                borderColor={'rgba(3, 168, 124, 1)'}
                color={'rgba(3, 168, 124, 1)'}
                colorHover={'#fff'}
                backgroundColorSelect={'rgba(3, 168, 124, 0.8)'}
                borderColorSelect={'rgba(3, 168, 124, 0.8)'}
                onClick={e => this.handleSubmit(e, username)}
              >
                Add Comment
              </Button>
            </Buttons>
          </Form>
        )}
      </AuthContext.Consumer>
    );
  }

  handleChange = e => {
    const { value, id } = e.target;
    this.setState({
      [id]: value,
    });
  };

  handleSubmit = (e, username) => {
    e.preventDefault();
    this.props.addComment(this.state.comment, username);
    this.setState({
      comment: '',
    });
  };
}

export default CommentAdd;
