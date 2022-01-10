import React from "react";
import PropTypes from 'prop-types';

// Components
import UserImage from "../UserImage/UserImage";

// Styles
import { 
  FollowButton, 
  UserInfoWrapper,
  ActionButtonWraper,
  StyledLink
 } from "./Styles";

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <StyledLink
        to="/settings"
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

  const handleClick = ev => {
    ev.preventDefault();
    if (props.user.following) {
      props.unfollow(props.user.username);
    } else {
      props.follow(props.user.username);
    }
  };

  return (
    <FollowButton
      onClick={handleClick}>
      
      {props.user.following ? 
        (<div className="follow-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1V15" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 8H15" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg> 
          Подписаться
        </div>)
        : 
        (<div className="follow-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 8H15" stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg> 
          Отписаться
        </div>)
      }
    </FollowButton>
  );
};

export default function ProfileUserInfo({ profile, isUser, onFollow, onUnfollow }) {
  return (
    <UserInfoWrapper>
      <UserImage src={profile.image}  alt={profile.username} location="profile" />
      <h4>{profile.username}</h4>
      <p>{profile.bio}</p>

      <ActionButtonWraper>
        <EditProfileSettings isUser={isUser} />
        <FollowUserButton
          isUser={isUser}
          user={profile}
          follow={onFollow}
          unfollow={onUnfollow}
        />
      </ActionButtonWraper>
    </UserInfoWrapper>
  );
}

EditProfileSettings.propTypes = {
  isUser: PropTypes.bool,
};

EditProfileSettings.defaultProps = {
  isUser: false,
};

FollowUserButton.propTypes = {
  isUser: PropTypes.bool,
  user: PropTypes.object,
  unfollow: PropTypes.func,
  follow: PropTypes.func,
};