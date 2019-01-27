import React, { Component } from 'react';
import { SpinLoader } from 'react-css-loaders';
import styled from 'styled-components';
import slug from 'slug';
import AuthContext from '../App/AuthContext';
import Section from '../../elements/Section';
import Button from '../../elements/Button';
import * as api from '../../utils';
import { capitalizeFirstLetter } from './utils';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 70vh;
`;

const Input = styled.input`
  padding: 1rem;
  font-family: 'Gentium Book Basic', serif;
  height: 5.4rem;
  font-size: 4.2rem;
  border-top: none;
  border-right: none;
  border-bottom: ${props => props.borderBottom};
  border-left: none;
  background-color: ${props => props.backgroundColor};
  color: rgba(0, 0, 0, 0.84);

  &::placeholder {
    color: rgba(0, 0, 0, 0.54);
    transition: color 0.5s;
  }

  &:focus {
    outline: none;

    &::placeholder {
      color: rgba(0, 0, 0, 0.24);
    }
  }
`;

const Select = styled.select`
  margin-top: 2rem;
  height: 4rem;
  border: none;

  &:focus {
    outline: none;
    border: 1px solid rgba(3, 168, 124, 1);
  }
`;

const TextArea = styled.textarea`
  font-family: 'Gentium Book Basic', serif;
  margin-top: 2.5rem;
  padding: 1rem;
  height: 75%;
  font-size: 2rem;
  border-top: none;
  border-right: none;
  border-bottom: ${props => props.borderBottom};
  border-left: none;
  background-color: ${props => props.backgroundColor};
  color: rgba(0, 0, 0, 0.84);
  resize: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.54);
    transition: color 0.5s;
  }

  &:focus {
    outline: none;

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

class ArticleAdd extends Component {
  state = {
    topics: [],
    title: '',
    topic: 'coding',
    body: '',
    loading: true,
    touched: {
      title: false,
      body: false,
    },
    error: '',
  };

  render() {
    const { topics, title, topic, body, loading, touched } = this.state;
    const errors = this.handleValidation(title, body);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);
    const shouldIndicateError = field => {
      const hasError = errors[field];
      const shouldShow = touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <AuthContext.Consumer>
        {({ username }) =>
          username && (
            <Section inputWidth="80%" inputMargin="0 auto">
              {loading ? (
                <SpinLoader size={5} color="#ccc" />
              ) : (
                <Form onSubmit={e => this.handleSubmit(e, username)}>
                  <Input
                    type="text"
                    id="title"
                    value={title}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur('title')}
                    placeholder="Title"
                    borderBottom={
                      shouldIndicateError('title')
                        ? 'solid 0.2rem rgba(255, 86, 48, 1)'
                        : 'solid 0.2rem transparent'
                    }
                    backgroundColor={
                      shouldIndicateError('title')
                        ? 'rgba(255, 86, 48, 0.1)'
                        : 'transparent'
                    }
                  />
                  <Select
                    type="select"
                    id="topic"
                    value={topic}
                    name="select"
                    onChange={this.handleChange}
                  >
                    {topics.map(({ slug }) => (
                      <option key={slug}>{capitalizeFirstLetter(slug)}</option>
                    ))}
                  </Select>
                  <TextArea
                    type="text"
                    id="body"
                    value={body}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur('body')}
                    placeholder="Tell your story..."
                    borderBottom={
                      shouldIndicateError('body')
                        ? 'solid 0.2rem rgba(255, 86, 48, 1)'
                        : 'solid 0.2rem transparent'
                    }
                    backgroundColor={
                      shouldIndicateError('body')
                        ? 'rgba(255, 86, 48, 0.1)'
                        : 'transparent'
                    }
                    rows="5"
                    cols="33"
                  />
                  <Buttons>
                    <Button
                      type="button"
                      borderColor={'rgba(0, 0, 0, 0.24)'}
                      borderColorHover={'rgba(0, 0, 0, 0.54)'}
                      color={'rgba(0, 0, 0, 0.54)'}
                      marginRight={'1.5rem'}
                      onClick={() => this.handleClick('/')}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      borderColor={'rgba(0, 0, 0, 0.24)'}
                      borderColorHover={'rgba(0, 0, 0, 0.54)'}
                      color={'rgba(0, 0, 0, 0.54)'}
                      marginRight={'1.5rem'}
                      onClick={() => this.handleClick('/new-topic')}
                    >
                      Add Topic
                    </Button>
                    <Button
                      type="button"
                      backgroundColorHover={'rgba(3, 168, 124, 1)'}
                      borderColor={'rgba(3, 168, 124, 1)'}
                      color={'rgba(3, 168, 124, 1)'}
                      colorHover={'#fff'}
                      backgroundColorSelect={'rgba(3, 168, 124, 0.8)'}
                      borderColorSelect={'rgba(3, 168, 124, 0.8)'}
                      disabled={!isEnabled}
                      backgroundColorDisabled={'transparent'}
                      colorHoverDisabled={'rgba(3, 168, 124, 1)'}
                      onClick={e => this.handleSubmit(e, username)}
                    >
                      Publish
                    </Button>
                  </Buttons>
                </Form>
              )}
            </Section>
          )
        }
      </AuthContext.Consumer>
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

  handleValidation = (title, body) => ({
    title: title.length === 0,
    body: body.length === 0,
  });

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  handleClick = path => {
    this.props.history.push(path);
  };

  handleSubmit = (e, username) => {
    e.preventDefault();
    const { title, body, topic } = this.state;

    api
      .addArticle(title, body, username, slug(topic.toLowerCase()))
      .then(article => {
        if (article.title === title) {
          this.props.history.push(`/${username}/${article.article_id}`);
        } else {
          this.setState({ error: 'Unable to add article' });
        }
      })
      .catch(error => this.setState({ error }));
  };
}

export default ArticleAdd;
