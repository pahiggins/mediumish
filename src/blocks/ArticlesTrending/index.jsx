import React, { Component } from 'react';
import styled from 'styled-components';
import { TrendingUp } from 'styled-icons/boxicons-regular';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  background-color: rgba(0, 0, 0, 0.03);
  height: 40rem; /* Remove this once content has been added */

  h2 {
    font-size: 2.2rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  height: 7rem;
  background-color: rgba(3, 168, 124, 0.15);
`;

const StyledTrendingUp = styled(TrendingUp)`
  margin-left: 1rem;
  height: 3rem;
  color: rgba(3, 168, 124, 1);
`;

class ArticlesTrending extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <h2>{this.props.title}</h2>
          <StyledTrendingUp />
        </Header>
      </Wrapper>
    );
  }
}

export default ArticlesTrending;
