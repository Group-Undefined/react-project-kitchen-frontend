import React from "react";
import PropTypes from 'prop-types';
import { UserImageWrapper } from "./Styles";
import defaultAvatarPath from '../../images/default-avatar.svg';

const defaultAvatarURL = 'https://static.productionready.io/images/smiley-cyrus.jpg';

export default function UserImage({src, location}) {
  let isDefault = false;
  if ( src === defaultAvatarURL ) {
    src = defaultAvatarPath;
    isDefault = true;
  }
  
  return (
    <UserImageWrapper src={src} location={location} isDefault={isDefault} />
  );
}

UserImage.propTypes = {
  src: PropTypes.string,
  location: PropTypes.string
};