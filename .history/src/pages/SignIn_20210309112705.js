import React from 'react';
import { Redirect } from 'react-router-dom';
import SignInForm from './SignInForm';
import { useOktaAuth } from '@okta/okta-react';
import { withOktaAuth } from '@okta/okta-react';

const SignIn = () => {
  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }
  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/> :
    <SignInForm />;
};

export default SignIn;

export default withOktaAuth(class SignIn extends Component {
    render() {
      if (this.props.authState.isPending) {
        return <div>Loading...</div>;
      }
      return this.props.authState.isAuthenticated ?
        <Redirect to={{ pathname: '/' }}/> :
        <SignInForm />;
    }
  });
