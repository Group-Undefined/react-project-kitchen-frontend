import Profile, { mapStateToProps } from './Profile/Profile.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onLoad: (pager, payload) =>
    dispatch({ type: PROFILE_PAGE_LOADED, pager, payload }),
  onUnload: () =>
    dispatch({ type: PROFILE_PAGE_UNLOADED })
});

function ProfileFavorites(props) {
  const onFavoritesLoad = () => {
    props.onLoad(page => agent.Articles.favoritedBy(props.match.params.username, page), Promise.all([
      agent.Profile.get(props.match.params.username),
      agent.Articles.favoritedBy(props.match.params.username)
    ]));
  };

  return (
    <Route render={ (props) => <Profile {...props} onFavoritesLoad={onFavoritesLoad} isFavorites={true} /> } />
  );
}

ProfileFavorites.propTypes = {
  onLoad: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
