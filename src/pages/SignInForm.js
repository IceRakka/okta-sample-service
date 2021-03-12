import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import QuestionForm from './QuestionForm';

export default withOktaAuth(class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.questionForm = React.createRef(QuestionForm);
    this.state = {
      sessionToken: null,
      username: '',
      password: '',
      showQuestion: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({showQuestion: true})
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
        <div>
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
            {this.state.showQuestion ? <QuestionForm data={this.state}/> : null}
        </div>

    );
  }
});