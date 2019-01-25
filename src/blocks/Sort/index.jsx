import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const Header = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 1.3rem;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  color: rgba(0, 0, 0, 0.54);

  li {
    margin-top: 0.8rem;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
  }
`;

class Sort extends Component {
  render() {
    return (
      <Fragment>
        <Header>
          <h2>{this.props.title.toUpperCase()}</h2>
        </Header>
        <Ul>
          <li onClick={() => this.props.handleSort('created_at')}>BY DATE</li>
          <li onClick={() => this.props.handleSort('comment_count')}>
            BY COMMENTS
          </li>
          <li onClick={() => this.props.handleSort('votes')}>BY VOTES</li>
        </Ul>
      </Fragment>
    );
  }
}

export default Sort;
