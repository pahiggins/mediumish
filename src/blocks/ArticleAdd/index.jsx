import React, { Component } from 'react';
import { SpinLoader } from 'react-css-loaders';
import styled from 'styled-components';
import Section from '../../elements/Section';
import * as api from '../../utils';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-family: 'Libre Baskerville', serif;
  margin-bottom: 2rem;
  height: 5.4rem;
  font-size: 4.2rem;
  border: none;
  color: rgba(0, 0, 0, 0.84);

  &::placeholder {
    color: rgba(0, 0, 0, 0.24);
  }

  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  margin-bottom: 2.5rem;
  height: 4rem;
  border: none;

  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  font-family: 'Libre Baskerville', serif;
  margin-bottom: 2rem;
  height: 55vh;
  font-size: 2rem;
  border: none;
  color: rgba(0, 0, 0, 0.84);
  resize: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.24);
  }

  &:focus {
    outline: none;
  }
`;

// const Select = styled.select``;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0 1.5rem;
  margin-right: ${props => props.marginRight || 0};
  height: 3.7rem;
  line-height: 3.7rem;
  background-color: ${props => props.backgroundColor};
  border-color: ${props => props.borderColor};
  border-radius: 0.4rem;
  font-size: 1.6rem;
  text-align: center;
  color: ${props => props.color};
  cursor: pointer;
  transition: borderColor 0.5s;

  &:hover {
    background-color: ${props => props.backgroundColorHover};
    border-color: ${props => props.borderColorHover};
    color: ${props => props.colorHover};
  }

  &:focus {
    outline: none;
  }

  &:select {
    background-color: ${props => props.backgroundColorSelect};
    border-color: ${props => props.borderColorSelect};
  }
`;

class ArticleAdd extends Component {
  state = {
    title: '',
    body: '',
    topics: [],
    loading: true,
    error: '',
  };

  render() {
    const { title, body, topics, loading } = this.state;

    return (
      <Section inputWidth="80%" inputMargin="0 auto">
        {loading ? (
          <SpinLoader size={5} color="#ccc" />
        ) : (
          <Form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={this.handleChange}
              placeholder="Title"
              autoFocus
            />
            <Select type="select" name="select" id="topics">
              {topics.map(({ slug }) => (
                <option>{slug}</option>
              ))}
            </Select>
            <TextArea
              type="text"
              id="body"
              value={body}
              onChange={this.handleChange}
              placeholder="Tell your story..."
              rows="5"
              cols="33"
            />
            <Buttons>
              <Button
                type="submit"
                borderColor={'rgba(0, 0, 0, 0.24)'}
                borderColorHover={'rgba(0, 0, 0, 0.54)'}
                color={'rgba(0, 0, 0, 0.54)'}
                marginRight={'1.5rem'}
                onClick={this.handleClick}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                backgroundColorHover={'rgba(3, 168, 124, 1)'}
                borderColor={'rgba(3, 168, 124, 1)'}
                color={'rgba(3, 168, 124, 1)'}
                colorHover={'#fff'}
                backgroundColorSelect={'rgba(3, 168, 124, 0.8)'}
                borderColorSelect={'rgba(3, 168, 124, 0.8)'}
                onClick={() => {}}
              >
                Publish
              </Button>
            </Buttons>
          </Form>
        )}
      </Section>
    );
  }

  componentDidMount() {
    this.loadTopics();
  }

  loadTopics = () => {
    api
      .getTopics()
      .then(topics => this.setState({ topics, loading: false }))
      .catch(error => this.setState({ error }));
  };

  handleChange = event => {
    const { value, id } = event.target;
    this.setState({
      [id]: value,
    });
  };

  handleClick = () => {
    this.props.history.push('/');
  };

  handleSubmit = event => {
    const { title, body } = this.state;

    event.preventDefault();

    this.props.addArticle({ title, body });
    this.setState({
      title: '',
      body: '',
    });
  };
}

export default ArticleAdd;
