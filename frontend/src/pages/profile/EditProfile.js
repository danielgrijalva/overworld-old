import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadProfile, editProfile } from "../../actions/profile";
import "./EditProfile.css";
class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      location: "",
      twitter: "",
      bio: ""
    };
  }

  componentWillReceiveProps(props) {
    if (!props.auth.isLoading & (Object.keys(props.profile).length === 0)) {
      this.props.loadProfile(props.auth.user.username);
    }

    if (Object.keys(props.profile).length > 0) {
      const { email, username, location, twitter, bio } = props.profile;
      this.setState({ email, username, location, twitter, bio });
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, username, location, twitter, bio } = this.state;

    const profile = {
      email,
      username,
      location,
      twitter,
      bio
    };

    this.props.editProfile(profile);
  };

  render() {
    const { profile } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input
            name="username"
            value={profile.username}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Email address</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Location</label>
          <input
            name="location"
            value={profile.location}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Twitter</label>
          <input
            name="twitter"
            value={profile.twitter}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button floated="right" positive fluid type="submit" disabled={false}>
          Save Changes
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  isLoading: state.profile.isLoading,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loadProfile, editProfile }
)(EditProfile);
