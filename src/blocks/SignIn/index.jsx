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
  padding: 1rem;
  font-family: 'Gentium Book Basic', serif;
  height: 5.4rem;
  font-size: 4.2rem;
  text-align: center;
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

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
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

  p {
    text-align: center;

    span {
      font-weight: bold;
    }
  }
`;

class SignIn extends Component {
  state = {
    usernameInput: 'tickle122',
    touched: {
      usernameInput: false,
    },
    error: '',
  };

  render() {
    const { usernameInput, touched, error } = this.state;
    const errors = this.handleValidation(usernameInput);
    const isEnabled = !Object.keys(errors).some(x => errors[x]);
    const shouldIndicateError = field => {
      const hasError = errors[field];
      const shouldShow = touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <Section inputWidth="80%" inputMargin="0 auto">
        <AuthContext.Consumer>
          {({ username, toggleUsername }) =>
            username
              ? this.renderLogOutContent(username, toggleUsername)
              : this.renderSignInContent(
                  usernameInput,
                  error,
                  toggleUsername,
                  shouldIndicateError,
                  isEnabled
                )
          }
        </AuthContext.Consumer>
      </Section>
    );
  }

  renderSignInContent = (
    usernameInput,
    error,
    toggleUsername,
    shouldIndicateError,
    isEnabled
  ) => {
    return (
      <Form onSubmit={e => this.signIn(e, toggleUsername)}>
        <Input
          type="text"
          id="usernameInput"
          value={usernameInput}
          onChange={this.handleChange}
          onBlur={this.handleBlur('usernameInput')}
          onSubmit={e => this.signIn(e, toggleUsername)}
          placeholder="Username"
          borderBottom={
            shouldIndicateError('usernameInput')
              ? 'solid 0.2rem rgba(255, 86, 48, 1)'
              : 'solid 0.2rem transparent'
          }
          backgroundColor={
            shouldIndicateError('usernameInput')
              ? 'rgba(255, 86, 48, 0.1)'
              : 'transparent'
          }
        />
        <Buttons>
          <Button
            type="button"
            borderColor={'rgba(0, 0, 0, 0.24)'}
            borderColorHover={'rgba(0, 0, 0, 0.54)'}
            color={'rgba(0, 0, 0, 0.54)'}
            margin={'0.75rem'}
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
            disabled={!isEnabled}
            backgroundColorDisabled={'transparent'}
            colorHoverDisabled={'rgba(3, 168, 124, 1)'}
            margin={'0.75rem'}
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

  renderLogOutContent = (username, toggleUsername) => {
    return (
      <Fragment>
        <WelcomeMessage>
          <p>
            Congratulations! You're now signed in as <span>{username}</span>.
          </p>
        </WelcomeMessage>
        <Buttons>
          <Button
            type="button"
            borderColor={'rgba(0, 0, 0, 0.24)'}
            borderColorHover={'rgba(0, 0, 0, 0.54)'}
            color={'rgba(0, 0, 0, 0.54)'}
            margin={'0.75rem'}
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
            margin={'0.75rem'}
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

  handleValidation = usernameInput => ({
    usernameInput: usernameInput.length === 0,
  });

  handleBlur = field => e => {
    this.setState(state => ({
      touched: { ...state.touched, [field]: true },
    }));
  };

  handleClick = () => {
    this.props.history.push('/');
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
        this.setState({ error });
      });
  };

  signOut = toggleUsername => {
    toggleUsername('');
  };
}

export default SignIn;
