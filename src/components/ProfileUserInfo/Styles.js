import styled from "styled-components"; 
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;

  background-color: #0000FF;
  border-radius: 8px;
  border: none;
  color: #FFF !important;
  text-decoration: none;
  height: 40px;

  &:hover {
    background-color: rgba(0, 0, 255, 0.8);
    text-decoration: none;
  }

  &:focus {
    outline: none;
  }
`;

export const ProfilePage = styled.div`
  background: #FAFAFA;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-items: flex-start;
  align-items: center;
  text-align: center;
  background: #FAFAFA;
  min-width: 1108px;
  padding: 32px 0; 

`;

export const FollowButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px 8px 35px;

  background-color: #0000FF;
  border-radius: 8px;
  color: #FFF;
  border: none;
  height: 40px;

  & svg {
    position: absolute;
    top: 12px;
    left: 12px; 
  }

  &:hover {
    background-color: rgba(0, 0, 255, 0.8);
  }

  &:focus {
    outline: none;
  }
`;

export const ActionButtonWraper = styled.div`
  width: max-content;
  align-self: end;
`;

