import React from "react";
import PropTypes from 'prop-types';

// Styles
import { PreviewWrapper } from "./Styles";

export default function PreviewLink({ article }) {
  return (
    <PreviewWrapper to={`/article/${article.slug}`}>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <span>Читать далее</span>
      <ul className="tag-list">
        {
          article.tagList.map(tag => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            );
          })
        }
      </ul>
    </PreviewWrapper>
  );
}

PreviewLink.propTypes = {
  article: PropTypes.object.isRequired
};