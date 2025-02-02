import agent from '../../agent';
import Header from '../Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Article from '../Article';
import Editor from '../Editor';
import Home from '../Home';
import Login from '../Login';
import Profile from '../Profile';
import ProfileFavorites from '../ProfileFavorites';
import Register from '../Register';
import Settings from '../Settings';
import { store } from '../../store';
import { push } from 'react-router-redux';
import {Container} from './Styles';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <Container>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser}
          />
          <div style={{gridArea: 'main'}}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/editor/:slug" component={Editor} />
              <Route path="/editor" component={Editor} />
              <Route path="/article/:id" component={Article} />
              <Route path="/settings" component={Settings} />
              <Route path="/@:username/favorites" component={ProfileFavorites} />
              <Route path="/@:username" component={Profile} />
            </Switch>
          </div>
        </Container>
      );
    }
    return (
      <Container>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </Container>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
