import React from 'react';
import Nav from '../../elements/Nav';
import Ul from '../../elements/Ul';
import Li from '../../elements/Li';
import A from '../../elements/A';

export default () => {
  return (
    <Nav>
      <Ul>
        <Li>
          <A href="#">HOME</A>
        </Li>
        <Li>
          <A href="#">2069</A>
        </Li>
        <Li>
          <A href="#">CULTURE</A>
        </Li>
        <Li>
          <A href="#">TECH</A>
        </Li>
        <Li>
          <A href="#">STARTUPS</A>
        </Li>
        <Li>
          <A href="#">SELF</A>
        </Li>
      </Ul>
    </Nav>
  );
};
