import React from 'react';
import styled from 'styled-components';
import { ThumbsUp, ThumbsDown } from 'styled-icons/feather';

const StyledVotes = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const StyledThumbsUp = styled(ThumbsUp)`
  height: 2.5rem;
  margin-right: 0.5rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.5s;

  &:hover {
    color: #03a87c;
  }
`;

const StyledThumbsDown = styled(ThumbsDown)`
  height: 2.5rem;
  margin-right: 0.5rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.5s;

  &:hover {
    color: #ff5630;
  }
`;

const P = styled.p`
  margin-left: 0.5rem;
  font-size: 1.4rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
`;

const Votes = ({ votes }) => {
  return (
    <StyledVotes>
      <StyledThumbsUp />
      <StyledThumbsDown />
      <P>{votes}</P>
    </StyledVotes>
  );
};

export default Votes;
