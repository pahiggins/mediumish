import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Person } from 'styled-icons/octicons';
import { AddCircle } from 'styled-icons/material';
import AuthContext from '../App/AuthContext';
import H1 from '../../elements/H1';
import Header from '../../elements/Header';

const StyledPerson = styled(Person)`
  color: ${props => props.color};
  cursor: pointer;

  &:hover {
    color: ${props => props.hoverColor};
  }
`;

const StyledNoteAdd = styled(AddCircle)`
  color: rgba(0, 0, 0, 0.15);
  margin-right: 1rem;
  cursor: pointer;

  &:hover {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const StyledLink = styled(Link)`
  color: rgba(0, 0, 0, 0.84);
  text-decoration: none;
`;

export default () => {
  return (
    <Header>
      <H1>
        <StyledLink to="/">Mediumish</StyledLink>
      </H1>
      <div>
        <AuthContext.Consumer>
          {({ username }) => {
            if (username) {
              return (
                <Fragment>
                  <Link to="/new-article">
                    <StyledNoteAdd size="34.14" title="Add Article" />
                  </Link>
                  <Link to="/sign-in">
                    <StyledPerson
                      size="32.5"
                      color="rgba(3, 168, 124, 0.3)"
                      hoverColor="rgba(3, 168, 124, 0.4)"
                    />
                  </Link>
                </Fragment>
              );
            } else {
              return (
                <Link to="/sign-in">
                  <StyledPerson
                    size="32.5"
                    color="rgba(0, 0, 0, 0.15)"
                    hoverColor="rgba(0, 0, 0, 0.2)"
                  />
                </Link>
              );
            }
          }}
        </AuthContext.Consumer>
      </div>
    </Header>
  );
};
