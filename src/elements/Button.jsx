import styled from 'styled-components';

const Button = styled.button`
  padding: 0 1.5rem;
  margin: ${props => props.margin || 0};
  height: 3.7rem;
  line-height: 3.7rem;
  background-color: ${props => props.backgroundColor || 'transparent'};
  border-color: ${props => props.borderColor};
  border-radius: 0.4rem;
  font-size: 1.6rem;
  text-align: center;
  color: ${props => props.color};
  cursor: pointer;
  transition: borderColor 0.5s;

  &:hover {
    background-color: ${props => props.backgroundColorHover};
    border-color: ${props => props.borderColorHover};
    color: ${props => props.colorHover};
  }

  &:focus {
    outline: none;
  }

  &:select {
    background-color: ${props => props.backgroundColorSelect};
    border-color: ${props => props.borderColorSelect};
  }

  &:hover:disabled {
    background-color: ${props => props.backgroundColorDisabled};
    color: ${props => props.colorHoverDisabled};
    cursor: not-allowed;
  }
`;

export default Button;
