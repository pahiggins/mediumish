import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Person } from 'styled-icons/material';
import H1 from '../../elements/H1';
import Header from '../../elements/Header';

const StyledPerson = styled(Person)`
  color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
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
      <StyledPerson size="40" />
    </Header>
  );
};
