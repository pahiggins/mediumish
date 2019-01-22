import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Person } from 'styled-icons/octicons';

const StyledUserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.5rem;
`;

const StyledPerson = styled(Person)`
  height: 5rem;
  width: 5rem;
  margin-right: 1rem;
  color: rgba(0, 0, 0, 0.15);
`;

const P = styled.p`
  padding: 0.25rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.inputColor || '#03a87c;'};
`;

const UserProfile = ({ author, createdAt }) => {
  return (
    <StyledUserProfile>
      <StyledPerson />
      <div>
        <P>{author}</P>
        <P inputColor="rgba(0, 0, 0, 0.54)">
          {moment(createdAt).format('MMM D, YYYY')}
        </P>
      </div>
    </StyledUserProfile>
  );
};

export default UserProfile;
