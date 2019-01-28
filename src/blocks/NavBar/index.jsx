import React, { Component } from 'react';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Nav from '../../elements/Nav';
import Ul from '../../elements/Ul';
import Li from '../../elements/Li';

import * as api from '../../utils';

const StyledLink = styled(Link)`
  color: rgba(0, 0, 0, 0.54);
  font-family: 'Open Sans', sans-serif;
  font-size: 1.3rem;
  font-weight: 500;
  text-decoration: none;

  :hover {
    color: rgba(0, 0, 0, 0.84);
  }
`;

class NavBar extends Component {
  state = {
    topics: [],
    error: '',
  };

  render() {
    const { topics } = this.state;

    return (
      <Media query="(min-width: 640px)">
        {query =>
          query && (
            <Nav>
              {topics.length === 0 ? null : (
                <Ul>
                  <Li key="Home">
                    <StyledLink to={'/'}>HOME</StyledLink>
                  </Li>
                  {topics.map(({ slug }) => (
                    <Li key={slug}>
                      <StyledLink to={`/topic/${slug.toLowerCase()}`}>
                        {slug.toUpperCase()}
                      </StyledLink>
                    </Li>
                  ))}
                </Ul>
              )}
            </Nav>
          )
        }
      </Media>
    );
  }

  componentDidMount() {
    this.loadTopics();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.loadTopics();
    }
  }

  loadTopics = () => {
    api
      .getTopics()
      .then(topics => this.setState({ topics }))
      .catch(error => this.setState({ error }));
  };
}

export default NavBar;
