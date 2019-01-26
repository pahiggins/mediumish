import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: center;
  padding: 1rem;
  margin-top: 3rem;
  background-color: rgba(0, 0, 0, 0.05);
  height: 30rem; /* Remove this once content has been added */

  h2 {
    font-size: 1.3rem;
  }
`;

class ArticlesTrending extends Component {
  render() {
    return (
      <Wrapper>
        <h2>{this.props.title.toUpperCase()}</h2>
      </Wrapper>
    );
  }
}

export default ArticlesTrending;
