import styled from "styled-components";

export const FavoriteButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background: none;
  border: none;
  color: ${props => props.favorited ? '#F3200C' : '#0A0A0B'};
  height: 23px;

  & svg {
    margin-left: 10px;
  }

  &:focus {
    outline: none;
  }
`;

export const MetaWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 16px;

  & .avatar-info-wrapper {
    display: flex;
    flex-flow: row nowrap;
  }
`;