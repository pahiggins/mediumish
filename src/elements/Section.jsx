import styled from 'styled-components';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  margin: ${props => props.inputMargin || 0};
  width: ${props => props.inputWidth || '100%'};
`;

export default Section;
