import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Person } from 'styled-icons/octicons';
import { AddCircle } from 'styled-icons/material';
import AuthContext from '../App/AuthContext';
import H1 from '../../elements/H1';
import Header from '../../elements/Header';

const StyledPerson = styled(Person)`
  color: rgba(0, 0, 0, 0.15);
  cursor: pointer;

  &:hover {
    color: rgba(0, 0, 0, 0.2);
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
          {({ status }) =>
            status === 'signedIn' && (
              <Link to="/new-article">
                <StyledNoteAdd size="34.14" />
              </Link>
            )
          }
        </AuthContext.Consumer>
        <Link to="/sign-in">
          <StyledPerson size="32.5" />
        </Link>
      </div>
    </Header>
  );
};
