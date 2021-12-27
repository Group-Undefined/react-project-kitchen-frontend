import ArticleList from '../ArticleList/ArticleList';
import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import { connect } from 'react-redux';
//import { useDispatch } from 'react-redux';
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../../constants/actionTypes';

// Components

import UserImage from '../UserImage/UserImage';

import defaultAvatarPath from '../../images/default-avatar.svg';

// Styles
import { 
  StyledLink, 
  StyledLi, 
  UserInfo,
  ActionButtonWraper
} from './Styles';

const EditProfileSettings = props => {


  if (props.isUser) {
    return (
      <StyledLink
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn"
      >
        Редактировать профиль
      </StyledLink>
    );
  }
  return null;
};


const FollowUserButton = props => {
  if (props.isUser) {
    return null;
  }

  let classes = 'btn btn-sm action-btn';
  if (props.user.following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username)
    } else {
      props.follow(props.user.username)
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {props.user.following ? 'Unfollow' : 'Follow'} {props.user.username}
    </button>
  );
};

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

  function renderTabs() {
    return (
      
      <ul className="nav nav-pills outline-active">
        <StyledLi 
          className="nav-item"
          active={!props.isFavorites} 
        >
          <Link
            className="nav-link "
            to={`/@${props.profile.username}`}
          >
            Ваши посты
          </Link>
        </StyledLi>

        <StyledLi 
          className="nav-item"
          active={props.isFavorites}
        >
          <Link
            className="nav-link"
            to={`/@${props.profile.username}/favorites`}
          >
            Любимые посты
          </Link>
        </StyledLi>
      </ul>
       
    );
  }

  
  const profile = props.profile;

  if (!profile) {
    return null;
  }

  const isUser = props.currentUser &&
    props.profile.username === props.currentUser.username;

  return (
    <div className="profile-page">

      <UserInfo>
        <UserImage src={profile.image}  alt={profile.username} location='profile' />
        <h4>{profile.username}</h4>
        <p>{profile.bio}</p>

        <ActionButtonWraper>
          <EditProfileSettings isUser={isUser} />
          <FollowUserButton
            isUser={isUser}
            user={profile}
            follow={props.onFollow}
            unfollow={props.onUnfollow}
          />
        </ActionButtonWraper>
      </UserInfo>

      <div className="container">
        <div className="row">

          <div className="col-xs-12 col-md-10 offset-md-1">

            <div className="articles-toggle">
              {renderTabs()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
