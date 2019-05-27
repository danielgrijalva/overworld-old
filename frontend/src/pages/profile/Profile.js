import React, { Component } from "react";
import { connect } from "react-redux";
import { loadProfile } from "../../actions/profile";
import { Container } from "semantic-ui-react";

class Profile extends Component {
  componentWillMount() {
    this.props.loadProfile();
  }

  render() {
    const { username, played } = this.props.profile;
    if (!this.props.isLoading) {
      return (
        <Container>
          <h1>{username}</h1>
          {played.map(g => {
            return <p>{g}</p>;
          })}
        </Container>
      );
    } else {
        return null;
    }
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  isLoading: state.profile.isLoading
});

export default connect(
  mapStateToProps,
  { loadProfile }
)(Profile);
