import React, { Component } from 'react';
import styled from 'styled-components';
import slug from 'slug';
import AuthContext from '../App/AuthContext';
import Section from '../../elements/Section';
import Button from '../../elements/Button';
import * as api from '../../utils';

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

class TopicAdd extends Component {
  state = {
    topics: [],
    topic: '',
    description: '',
    touched: {
      topic: false,
      description: false,
    },
    error: '',
  };

  render() {
    const { topic, description, touched, error } = this.state;
    const errors = this.handleValidation(topic, description);
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
              <Form onSubmit={this.handleSubmit}>
                <Input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur('topic')}
                  placeholder="Topic"
                  borderBottom={
                    shouldIndicateError('topic')
                      ? 'solid 0.2rem rgba(255, 86, 48, 1)'
                      : 'solid 0.2rem transparent'
                  }
                  backgroundColor={
                    shouldIndicateError('topic')
                      ? 'rgba(255, 86, 48, 0.1)'
                      : 'transparent'
                  }
                />
                {error && <p>{error}</p>}
                <TextArea
                  type="text"
                  id="description"
                  value={description}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur('description')}
                  placeholder="Describe topic..."
                  borderBottom={
                    shouldIndicateError('description')
                      ? 'solid 0.2rem rgba(255, 86, 48, 1)'
                      : 'solid 0.2rem transparent'
                  }
                  backgroundColor={
                    shouldIndicateError('description')
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
                    onClick={() => this.handleClick('/new-article')}
                  >
                    Cancel
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
                    onClick={this.handleSubmit}
                  >
                    Add Topic
                  </Button>
                </Buttons>
              </Form>
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
      .then(topics => this.setState({ topics }))
      .catch(error => this.setState({ error }));
  };

  handleChange = event => {
    const { value, id } = event.target;
    this.setState({
      [id]: value,
    });
  };

  handleValidation = (topic, description) => ({
    topic: topic.length === 0,
    description: description.length === 0,
  });

  handleBlur = field => e => {
    this.setState(state => ({
      touched: { ...state.touched, [field]: true },
    }));
  };

  handleClick = path => {
    this.props.history.push(path);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { topics, topic, description } = this.state;
    const match = topics.filter(
      existingTopic => existingTopic.slug.toLowerCase() === topic.toLowerCase()
    );

    if (match.length === 0) {
      api
        .addTopic(slug(topic.toLowerCase()), description)
        .then(topic => this.props.history.push(`/new-article`))
        .catch(error => this.setState({ error }));
    } else {
      this.setState({ error: 'Topic already exists' });
    }
  };
}

export default TopicAdd;
