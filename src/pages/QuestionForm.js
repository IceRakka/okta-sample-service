import React, { Component } from 'react';
import { withOktaAuth } from '@okta/okta-react';
import users from '../server/users';

export default withOktaAuth(class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      username: '',
      password: '',
      answer: 'blue',
      question: 'default question'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.oktaAuth.signIn({
      username: this.props.data.username,
      password: this.props.data.password
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

  handleAnswerChange(e) {
    this.setState({answer: e.target.value});
  }

  render() {
    if (this.state.sessionToken) {
      // Hide form while sessionToken is converted into id/access tokens
      return null;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {users.get(this.props.data.username)['question']}:
          <input
            type="text"
            defaultValue={this.state.answer}
            onChange={this.handleAnswerChange} />
        </label>
        <input id="submit" type="submit" value="Log In" />
      </form>
    );
  }
});