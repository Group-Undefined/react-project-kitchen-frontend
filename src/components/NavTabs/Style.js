import styled from 'styled-components';

export const StyledLi = styled.li`
  box-shadow: inset 0px -2px 0px ${props => props.active ? 'rgba(0, 0, 255, 1)' : 'rgba(0, 0, 255, 0)'};
  max-width: max-content;

  & .nav-link {
    ${props => props.active ? 'color: #0A0A0B !important;' : ''}
  } 
`;