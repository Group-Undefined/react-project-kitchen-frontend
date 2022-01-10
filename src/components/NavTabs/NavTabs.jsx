import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import agent from '../../agent';

// Components


// Styles
import { StyledLi } from "./Style";

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    };

    return (
      <StyledLi 
        className="nav-item"
        active={props.tab === 'feed'}
      >    
        <Link
          className="nav-link "
          to={`/`}
          onClick={clickHandler}
        >
          Ваша лента
        </Link>
      </StyledLi>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };
  return (
    <StyledLi 
      className="nav-item"
      active={props.tab === 'all'}
    >    
      <Link
        className="nav-link "
        to={`/`}
        onClick={clickHandler}
      >
        Лента
      </Link>
    </StyledLi>
  );
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <StyledLi 
      className="nav-item"
      active={true}
    >    
      <Link
        className="nav-link "
        to={`/`}
      >
        <i className="ion-pound"></i> {props.tag}
      </Link>
    </StyledLi>
    
  );
};

export default function NavTabs(props) {
  if(props.location.pathname.split('/')[1] === '') {
    return (
      <ul className="nav nav-pills outline-active">
        <YourFeedTab
          token={props.token}
          tab={props.tab}
          onTabClick={props.onTabClick} />

        <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

        <TagFilterTab tag={props.tag} />
      </ul> 
    );
  } else {
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
}

NavTabs.propTypes = { 
  location: PropTypes.object.isRequired,
  token: PropTypes.string,
  tab: PropTypes.string,
  tag: PropTypes.string,
  onTabClick: PropTypes.func,
  isFavorites: PropTypes.bool,
  profile: PropTypes.object,

};

NavTabs.defaultProps = {
  token: null,
  tag: undefined,
  tab: undefined,
  isFavorites: undefined,
  onTabClick: undefined,
};

YourFeedTab.propTypes = {
  token: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  tab: PropTypes.string,
};

GlobalFeedTab.propTypes = {
  onTabClick: PropTypes.func.isRequired,
  tab: PropTypes.string,
};

TagFilterTab.propTypes = {
  tag: PropTypes.string,
};

TagFilterTab.defaultProps = {
  tag: undefined,
};