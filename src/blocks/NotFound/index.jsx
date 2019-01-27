import React from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem;
  font-size: 3rem;
  font-weight: 200;
  color: rgba(0, 0, 0, 0.54);

  h1 {
    margin-bottom: 3rem;
    font-weight: 200;
    color: rgba(0, 0, 0, 0.84);
  }

  p {
    margin-bottom: 9rem;
  }
`;

const NotFound = ({ history }) => {
  return (
    <Wrapper>
      <h1>404</h1>
      <p>Oops! We can't seem to find the page you're looking for.</p>
      <Button
        type="button"
        borderColor={'rgba(0, 0, 0, 0.24)'}
        borderColorHover={'rgba(0, 0, 0, 0.54)'}
        color={'rgba(0, 0, 0, 0.54)'}
        onClick={() => history.push('/')}
      >
        Browse Articles
      </Button>
    </Wrapper>
  );
};

export default NotFound;
