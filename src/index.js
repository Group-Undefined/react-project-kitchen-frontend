import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { store, history} from './store';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import LucidaSansUnicodeWoff from './fonts/lucida-sans-unicode.woff';
import LucidaSansUnicodeWoff2 from './fonts/lucida-sans-unicode.woff2';

import App from './components/App';

const Global = createGlobalStyle`
  @font-face {
    font-family: 'Neue Machina';
    src: local('Neue Machina'), local('NeueMachina'),
    url("./fonts/NeueMachina-Regular.woff2") format('woff2'),
    url("./fonts/NeueMachina-Regular.woff") format('woff');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'lucida sans';
    src: local('lucida-sans'), local('lucida sans'),
    url(${LucidaSansUnicodeWoff2}) format('woff2'),
    url(${LucidaSansUnicodeWoff}) format('woff');
    font-weight: 400;
    font-style: normal;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
    font-family: 'lucida sans', sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  }
`;

const theme = {
  colors: {
    primary: '#0A0A0B',
    secondary: '#62626A',
    accent: '#0000FF',
    alert: '#F3200C',

    primaryBg: '#FAFAFA',

  }
};

ReactDOM.render((
  <ThemeProvider theme={theme}>
    <Global />
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>

), document.getElementById('root'));
