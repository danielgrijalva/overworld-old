import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Grid, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  loadProfile,
  editProfile,
  refreshAvatar
} from "../../../profile/actions";
import { ChooseFavorites } from "../../components";
import "./styles.css";

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
    this.props.editProfile(this.state);
  };

  refreshAvatar = () => {
    this.props.refreshAvatar(this.props.auth.user.username);
    window.location.reload();
  };

  render() {
    const { email, username, location, twitter, bio } = this.state;
    const { gravatar, favorites } = this.props.profile;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Username</label>
                <input
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Location</label>
                <input
                  name="location"
                  value={location ? location : ""}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Twitter</label>
                <input
                  name="twitter"
                  value={twitter ? twitter : ""}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={bio ? bio : ""}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button
                floated="right"
                positive
                fluid
                type="submit"
                disabled={false}
              >
                Save
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={8}>
            <ChooseFavorites favorites={favorites}/>
            <Grid>
              <Grid.Row>
                <Grid.Column mobile={4}>
                  <Image
                    src={gravatar}
                    circular
                    className="profile-avatar"
                    size="tiny"
                  />
                </Grid.Column>
                <Grid.Column verticalAlign="middle" computer={7} mobile={5}>
                  <Form onSubmit={this.refreshAvatar}>
                    <Form.Field>
                      <label>Avatar</label>
                      We use a <a href="https://en.gravatar.com/">
                        Gravatar
                      </a>{" "}
                      that matches the email address on your account.
                    </Form.Field>
                    <Button floated="right" fluid type="submit">
                      Refresh Avatar
                    </Button>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

EditProfile.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loadProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  refreshAvatar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  isLoading: state.profile.isLoading,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loadProfile, editProfile, refreshAvatar }
)(EditProfile);
