import React, { Component } from "react";
import { connect } from "react-redux";
import Landing from "../landing/Landing";

class App extends Component {
  render() {
    if (this.props.auth.isAuthenticated) {
      return <h1>Welcome</h1>;
    } else if (this.props.auth.isLoading) {
      return null;
    } else {
      return <Landing />;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
