import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Warning } from 'styled-icons/icomoon';
import AuthContext from '../App/AuthContext';
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

const ErrorMessage = styled.div`
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

const WelcomeMessage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  padding: 1.5rem;
  font-size: 1.6rem;
`;

class SignIn extends Component {
  state = {
    usernameInput: '',
    error: '',
  };

  render() {
    const { usernameInput, error } = this.state;

    return (
      <Section inputWidth="80%" inputMargin="0 auto">
        <AuthContext.Consumer>
          {({ username, toggleUsername }) =>
            username
              ? this.renderLogOutContent(toggleUsername)
              : this.renderSignInContent(usernameInput, error, toggleUsername)
          }
        </AuthContext.Consumer>
      </Section>
    );
  }

  renderSignInContent = (usernameInput, error, toggleUsername) => {
    return (
      <Form onSubmit={e => this.signIn(e, toggleUsername)}>
        <Input
          type="text"
          id="usernameInput"
          value={usernameInput}
          onChange={this.handleChange}
          onSubmit={e => this.signIn(e, toggleUsername)}
          placeholder="Username"
          autoFocus
        />
        <Buttons>
          <Button
            type="button"
            borderColor={'rgba(0, 0, 0, 0.24)'}
            borderColorHover={'rgba(0, 0, 0, 0.54)'}
            color={'rgba(0, 0, 0, 0.54)'}
            marginRight={'1.5rem'}
            onClick={this.handleClick}
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
            onClick={e => this.signIn(e, toggleUsername)}
          >
            Sign In
          </Button>
        </Buttons>
        {error && (
          <ErrorMessage>
            <StyledWarning />
            <p>{error}</p>
          </ErrorMessage>
        )}
      </Form>
    );
  };

  renderLogOutContent = toggleUsername => {
    return (
      <Fragment>
        <WelcomeMessage>
          <p>Congratulations! You're now signed in.</p>
        </WelcomeMessage>
        <Buttons>
          <Button
            type="button"
            borderColor={'rgba(0, 0, 0, 0.24)'}
            borderColorHover={'rgba(0, 0, 0, 0.54)'}
            color={'rgba(0, 0, 0, 0.54)'}
            marginRight={'1.5rem'}
            onClick={this.handleClick}
          >
            Browse Articles
          </Button>
          <Button
            type="button"
            backgroundColorHover={'rgba(3, 168, 124, 1)'}
            borderColor={'rgba(3, 168, 124, 1)'}
            color={'rgba(3, 168, 124, 1)'}
            colorHover={'#fff'}
            backgroundColorSelect={'rgba(3, 168, 124, 0.8)'}
            borderColorSelect={'rgba(3, 168, 124, 0.8)'}
            onClick={() => this.signOut(toggleUsername)}
          >
            Sign Out
          </Button>
        </Buttons>
      </Fragment>
    );
  };

  handleChange = event => {
    const { value, id } = event.target;
    this.setState({
      [id]: value,
    });
  };

  handleClick = () => {
    this.props.history.push('/art');
  };

  signIn = (e, toggleUsername) => {
    e.preventDefault();
    const { usernameInput } = this.state;

    api
      .validateUser(usernameInput)
      .then(user => {
        if (user.username) {
          toggleUsername(user.username);
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

  signOut = toggleUsername => {
    toggleUsername('');
  };
}

export default SignIn;
