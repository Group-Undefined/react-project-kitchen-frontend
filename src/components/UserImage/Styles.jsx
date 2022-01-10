import styled from "styled-components";

export const UserImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: center/${props => props.isDefault ? '70%' : 'cover'} no-repeat #E9E9ED ${props => `url(${props.src})`};
  border: 2px solid #0A0A0B;
  border-radius: 50%;;
  box-sizing: border-box;
  ${props => {
    switch (props.location) {
    default:
    case 'profile': {
      return 'width: 120px; height: 120px; margin-bottom: 8px;';
    }
    case 'article': {
      return 'width: 48px; height: 48px; margin-right: 8px;';
    }
      
    }
  }}
`;

