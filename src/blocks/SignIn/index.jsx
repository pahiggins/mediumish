import React, { Component } from 'react';
import styled from 'styled-components';
import { Warning } from 'styled-icons/icomoon';
import Section from '../../elements/Section';
import Button from '../../elements/Button';
import * as api from '../../utils';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  text-align: center;
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

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4rem;
  padding: 1.5rem;
  border-radius: 0.3rem;
  font-size: 1.6rem;
  color: rgba(255, 86, 48, 1);
  background-color: rgba(255, 86, 48, 0.1);

  p {
    margin-left: 1rem;
  }
`;

const StyledWarning = styled(Warning)`
  height: 2rem;
  color: rgba(255, 86, 48, 1);
`;

class SignIn extends Component {
  state = {
    username: '',
    error: '',
  };

  render() {
    const { username, error } = this.state;

    return (
      <Section inputWidth="80%" inputMargin="0 auto">
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={this.handleChange}
            placeholder="Username"
            autoFocus
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
            >
              Sign In
            </Button>
          </Buttons>
          {error && (
            <Error>
              <StyledWarning />
              <p>{error}</p>
            </Error>
          )}
        </Form>
      </Section>
    );
  }

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
    event.preventDefault();
    const { username } = this.state;

    api
      .validateUser(username)
      .then(user => {
        if (user.username) {
          // Set context here.
          this.props.history.push('/');
        } else {
          this.setState({
            error: 'The username you entered is incorrect.',
          });
        }
      })
      .catch(error => {
        console.log('Error', error);
        this.setState({ error });
      });
  };
}

export default SignIn;