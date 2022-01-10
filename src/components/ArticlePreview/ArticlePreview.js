import React from 'react';
import PropTypes from 'prop-types';
import agent from '../../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../../constants/actionTypes';

// Components
import ArticleMeta from '../ArticleMeta/ArticleMeta.jsx';
import PreviewLink from '../PreviewLink/PreviewLink';

// Styles
import { 
  ArticleWrapper
} from './Styles';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug)
  })
});

const ArticlePreview = ({ article, unfavorite, favorite }) => {
  //const article = props.article;

  return (
    <ArticleWrapper>
      <div className="strange-block" />
      <div className="article-preview">
        <ArticleMeta article={article} unfavorite={unfavorite} favorite={favorite} />
        <PreviewLink article={article} />
      </div>
    </ArticleWrapper>
    
  );
};

ArticlePreview.propTypes = {
  article: PropTypes.any,
  unfavorite: PropTypes.func,
  favorite: PropTypes.func
};

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
