import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

// Components
import UserImage from "../UserImage/UserImage";
import LikeIcon from "../LikeIcon/LikeIcon";
import AuthorData from "../AuthorDate/AuthorDate";

// Styles
import { 
  FavoriteButton,
  MetaWrapper 
} from "./Styles";

export default function ArticleMeta({ article, unfavorite, favorite }) {
  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      unfavorite(article.slug);
    } else {
      favorite(article.slug);
    }
  };

  return (
    <MetaWrapper>
      <div className="avatar-info-wrapper">
        <Link to={`/@${article.author.username}`}>
          <UserImage src={article.author.image} alt={article.author.username} location="article" />
        </Link>
        <AuthorData article={article} />
      </div>
      
      <FavoriteButton favorited={article.favorited} onClick={handleClick}>
        {article.favoritesCount && article.favoritesCount} 
        <LikeIcon favorited={article.favorited} />
      </FavoriteButton>
    </MetaWrapper>
  );
}

ArticleMeta.propTypes = {
  article: PropTypes.object.isRequired,
  unfavorite: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired
};
