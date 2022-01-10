import PropTypes from 'prop-types';
import ArticleList from '../ArticleList/ArticleList.jsx';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../../constants/actionTypes';

// Components
import ProfileUserInfo from '../ProfileUserInfo/ProfileUserInfo';
import NavTabs from '../NavTabs/NavTabs';



const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onFollow: username => dispatch({
    type: FOLLOW_USER,
    payload: agent.Profile.follow(username)
  }),
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnfollow: username => dispatch({
    type: UNFOLLOW_USER,
    payload: agent.Profile.unfollow(username)
  }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
});

function Profile(props) {
  React.useEffect(() => {
    if(props.isFavorites) {
      props.onFavoritesLoad();
    } else {
      props.onLoad(Promise.all([
        agent.Profile.get(props.match.params.username),
        agent.Articles.byAuthor(props.match.params.username)
      ]));
    }
    return () => {
      props.onUnload();
    };
    // eslint-disable-next-line
  },[]);
  
  const profile = props.profile;

  if (!profile) {
    return null;
  }

  const isUser = props.currentUser &&
    props.profile.username === props.currentUser.username;

  return (
    <div className="profile-page">

      <ProfileUserInfo profile={profile} isUser={isUser} onFollow={props.onFollow} onUnfollow={props.onUnfollow} />

      <div className="container">
        <div className="row">

          <div className="col-xs-12 col-md-10 offset-md-1">

            <div className="articles-toggle">
              <NavTabs location={props.location} profile={profile} isFavorites={props.isFavorites} />
            </div>

            <ArticleList
              pager={props.pager}
              articles={props.articles}
              articlesCount={props.articlesCount}
              state={props.currentPage} />
          </div>

        </div>
      </div>

    </div>
  );
  
}

Profile.propTypes = {
  currentUser: PropTypes.object.isRequired,
  onFollow: PropTypes.func.isRequired,
  onUnfollow: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onUnload: PropTypes.func.isRequired,
  isFavorites: PropTypes.bool,
  onFavoritesLoad: PropTypes.func,
  match: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  pager: PropTypes.func,
  currentPage: PropTypes.number,
  articles: PropTypes.array,
  articlesCount: PropTypes.number,
  location: PropTypes.object.isRequired
};

Profile.defaultProps = {
  isFavorites: undefined,
  onFavoritesLoad: undefined,
  pager: undefined,
  currentPage: 0,
  articles: undefined,
  articlesCount: 0
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
