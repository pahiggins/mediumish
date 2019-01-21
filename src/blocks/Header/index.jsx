import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Person } from 'styled-icons/material';
import H1 from '../../elements/H1';
import Header from '../../elements/Header';

const GreyPerson = styled(Person)`
  color: #ccc;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
`;

export default () => {
  return (
    <Header>
      <H1>
        <StyledLink to="/">Mediumish</StyledLink>
      </H1>
      <GreyPerson size="40" />
    </Header>
  );
};
