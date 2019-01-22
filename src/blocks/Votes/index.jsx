import React from 'react';
import styled from 'styled-components';
import { ThumbsUp, ThumbsDown } from 'styled-icons/feather';

const StyledVotes = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.inputMarginBottom || 0};
`;

const StyledThumbsUp = styled(ThumbsUp)`
  height: ${props => props.inputHeight || '3rem'};
  margin-right: 0.5rem;
  color: #ccc;
  cursor: pointer;
  transition: color 0.5s;

  &:hover {
    color: #03a87c;
  }
`;

const StyledThumbsDown = styled(ThumbsDown)`
  height: ${props => props.inputHeight || '3rem'};
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

const Votes = ({ votes, id, updateVotes, inputMarginBottom, inputHeight }) => {
  return (
    <StyledVotes inputMarginBottom={inputMarginBottom}>
      <StyledThumbsUp
        onClick={() => updateVotes(1, id)}
        inputHeight={inputHeight}
      />
      <StyledThumbsDown
        onClick={() => updateVotes(-1, id)}
        inputHeight={inputHeight}
      />
      <P>{votes}</P>
    </StyledVotes>
  );
};

export default Votes;
