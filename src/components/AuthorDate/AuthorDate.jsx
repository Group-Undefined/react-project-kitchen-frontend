import React from "react";
import PropTypes from "prop-types";
import  { Link } from "react-router-dom";

import { AuthorDataWrapper } from "./Styles";


export default function AuthorData({ article }) {
  return (
    <AuthorDataWrapper>
      <Link className="author" to={`/@${article.author.username}`}>
        {article.author.username}
      </Link>
      <span className="date">
        {new Date(article.createdAt).toLocaleDateString('ru', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
      </span>
    </AuthorDataWrapper>  
  );
}

AuthorData.propTypes = {
  article: PropTypes.object.isRequired
};

