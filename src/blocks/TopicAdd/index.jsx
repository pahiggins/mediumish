import React, { Component } from 'react';
import styled from 'styled-components';
import AuthContext from '../App/AuthContext';
import Section from '../../elements/Section';
import Button from '../../elements/Button';
import * as api from '../../utils';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-family: 'Libre Baskerville', serif;
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

const TextArea = styled.textarea`
  font-family: 'Libre Baskerville', serif;
  margin-top: 2.5rem;
  height: 55vh;
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

class TopicAdd extends Component {
  state = {
    topics: [],
    slug: '',
    description: '',
    error: '',
  };

  render() {
    const { slug, description, error } = this.state;

    return (
      <AuthContext.Consumer>
        {({ username }) =>
          username && (
            <Section inputWidth="80%" inputMargin="0 auto">
              <Form onSubmit={this.handleSubmit}>
                <Input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={this.handleChange}
                  placeholder="Topic"
                  autoFocus
                />
                {error && <p>{error}</p>}
                <TextArea
                  type="text"
                  id="description"
                  value={description}
                  onChange={this.handleChange}
                  placeholder="Describe topic..."
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

  handleClick = path => {
    this.props.history.push(path);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { topics, slug, description } = this.state;
    const match = topics.filter(
      topic => topic.slug.toLowerCase() === slug.toLowerCase()
    );

    if (match.length === 0) {
      api
        .addTopic(slug, description)
        .then(topic => this.props.history.push(`/new-article`))
        .catch(error => this.setState({ error }));
    } else {
      this.setState({ error: 'Topic already exists' });
    }
  };
}

export default TopicAdd;
