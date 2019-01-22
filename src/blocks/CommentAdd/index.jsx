import React, { Component } from 'react';
import styled from 'styled-components';

const Form = styled.form``;

const TextArea = styled.textarea``;

const Button = styled.button``;

class CommentAdd extends Component {
  state = {
    comment: '',
  };

  render() {
    const { comment } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <TextArea
          type="text"
          id="comment"
          value={comment}
          onChange={this.handleChange}
          placeholder="Add a comment..."
          rows="5"
          cols="33"
        />
        <Button type="submit">Publish</Button>
      </Form>
    );
  }

  handleChange = event => {
    const { value, id } = event.target;
    this.setState({
      [id]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addComment(this.state.comment);
    this.setState({
      comment: '',
    });
  };
}

export default CommentAdd;
