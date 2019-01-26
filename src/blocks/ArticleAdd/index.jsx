import React, { Component } from 'react';
import { SpinLoader } from 'react-css-loaders';
import styled from 'styled-components';
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
  font-family: 'Gentium Book Basic', serif;
  height: 5.4rem;
  font-size: 4.2rem;
  border: none;
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
  height: 75%;
  font-size: 2rem;
  border: none;
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
    error: '',
  };

  render() {
    const { topics, title, topic, body, loading } = this.state;

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
                    placeholder="Title"
                    autoFocus
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
                    placeholder="Tell your story..."
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

  handleClick = path => {
    this.props.history.push(path);
  };

  handleSubmit = (event, username) => {
    event.preventDefault();
    const { title, body, topic } = this.state;

    api
      .addArticle(title, body, username, topic)
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
