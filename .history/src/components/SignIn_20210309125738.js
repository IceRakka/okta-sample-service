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