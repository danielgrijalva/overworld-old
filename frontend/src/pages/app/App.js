import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import Landing from "../landing/Landing";

class App extends Component {
  render() {
    if (this.props.auth.isAuthenticated) {
      return (
        <Container>
          <h1>Welcome</h1>
        </Container>
      );
    } else if (this.props.auth.isLoading) {
      return null;
    } else {
      return <Landing />;
    }
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
