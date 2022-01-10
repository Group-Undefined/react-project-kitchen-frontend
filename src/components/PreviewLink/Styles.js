import styled from "styled-components";
import { Link } from "react-router-dom";

export const PreviewWrapper = styled(Link)`
  &:hover {
    text-decoration: none;
  }

  & h1 {
    color: #0A0A0B;
    font-size: 24px;
    line-height: 28px;
  }

  & p {
    color: #62626A;
    font-size: 16px;
    line-height: 24px;
  }

  & span {
    color: #0000FF;
    text-decoration: underline;
    font-size: 16px;
    line-height: 24px;
  }
`;