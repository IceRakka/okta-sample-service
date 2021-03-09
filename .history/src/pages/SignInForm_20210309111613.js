import React, { useState, Component }  from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { withOktaAuth } from '@okta/okta-react';

const SignInForm = () => {
    const { oktaAuth } = useOktaAuth();
    const [sessionToken, setSessionToken] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        oktaAuth.signInWithCredentials({ username, password })
            .then(res => {
                const sessionToken = res.sessionToken;
                setSessionToken(sessionToken);
                // sessionToken is a one-use token, so make sure this is only called once
                oktaAuth.signInWithRedirect({ sessionToken });
            })
            .catch(err => console.log('Found an error', err));
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    if (sessionToken) {
        // Hide form while sessionToken is converted into id/access tokens
        return null;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
        <input
                    id="username" type="text"
                    value={username}
                    onChange={handleUsernameChange} />
            </label>
            <label>
                Password:
        <input
                    id="password" type="password"
                    value={password}
                    onChange={handlePasswordChange} />
            </label>
            <input id="submit" type="submit" value="Submit" />
        </form>
    );
};
export default SignInForm;

export default withOktaAuth(class SignInForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        sessionToken: null,
        username: '',
        password: ''
      };
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }
  
    handleSubmit(e) {
      e.preventDefault();
      this.props.oktaAuth.signIn({
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        const sessionToken = res.sessionToken;
        this.setState(
          { sessionToken },
          // sessionToken is a one-use token, so make sure this is only called once
          () => this.props.oktaAuth.signInWithRedirect({sessionToken})
        );
      })
      .catch(err => console.log('Found an error', err));
    }
  
    handleUsernameChange(e) {
      this.setState({username: e.target.value});
    }
  
    handlePasswordChange(e) {
      this.setState({password: e.target.value});
    }
  
    render() {
      if (this.state.sessionToken) {
        // Hide form while sessionToken is converted into id/access tokens
        return null;
      }
  
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              id="username" type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange} />
          </label>
          <label>
            Password:
            <input
              id="password" type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange} />
          </label>
          <input id="submit" type="submit" value="Submit" />
        </form>
      );
    }
  });