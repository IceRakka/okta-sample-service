import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Protected from './pages/Protected';

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };

  const oktaAuth = new OktaAuth({
    issuer: 'https://dev-5368884.okta.com/oauth2/ausbetfefVBJMmjWu5d6',
    clientId: '0oa7m8hxvShDZCRBv5d6',
    redirectUri: window.location.origin + '/login/callback',
    onAuthRequired: onAuthRequired,
    pkce: false
  });

  return (
    <Security oktaAuth={oktaAuth}>
      <Route path='/' exact={true} component={Home} />
      <SecureRoute path='/protected' component={Protected} />
      <Route path='/login' render={() => <SignIn />} />
      <Route path='/login/callback' component={LoginCallback} />
    </Security>
  );
};
export default AppWithRouterAccess;