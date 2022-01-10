import React from 'react';
import PropTypes from 'prop-types';

import ArticleList from '../ArticleList/ArticleList.jsx';


import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import NavTabs from '../NavTabs/NavTabs';

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <NavTabs location={props.location} token={props.token} tab={props.tab} onTabClick={props.onTabClick} />
      </div>

      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

MainView.propTypes = {
  location: PropTypes.object.isRequired,
  token: PropTypes.string,
  tab: PropTypes.string,
  onTabClick: PropTypes.func.isRequired,
  pager: PropTypes.func,
  articles: PropTypes.array,
  articlesCount: PropTypes.number,
  loading: PropTypes.bool,
  currentPage: PropTypes.number
};

MainView.defaultProps = {
  token: null,
  tab: undefined,
  pager: undefined,
  articles: undefined,
  articlesCount: undefined,
  loading: undefined,
  currentPage: undefined
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

