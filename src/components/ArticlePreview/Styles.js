import styled from "styled-components";

export const ArticleMeta = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 16px;
`;

export const ArticleWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  padding: 32px 0;
  border-bottom: 1px solid #DDDDE3;

  & .strange-block {
    background-color: #F4F4F6;
    width: 160px;
    height: 200px;
    margin-right: 16px;
    border-radius: 7px;
  }

  & .article-preview {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    border: none;
  }
`;