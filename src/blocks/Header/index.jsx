import React from 'react';
import styled from 'styled-components';
import { Person } from 'styled-icons/material';
import H1 from '../../elements/H1';
import Header from '../../elements/Header';

const GreyPerson = styled(Person)`
  color: #ccc;
  cursor: pointer;
`;

export default () => {
  return (
    <Header>
      <H1>NC News</H1>
      <GreyPerson size="40" />
    </Header>
  );
};
