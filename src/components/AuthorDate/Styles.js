import styled from "styled-components";

export const AuthorDataWrapper = styled.div`
display: flex;
flex-flow: column nowrap;

& .author {
  color: #0A0A0B;
  font-size: 16px;
  line-height: 24px;
}

& .date {
  color: #62626A;
  font-size: 12px;
  line-height: 16px;
}
`;