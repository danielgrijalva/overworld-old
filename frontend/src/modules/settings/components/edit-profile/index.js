import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Image } from "semantic-ui-react";
import {
  loadProfile,
  editProfile,
  refreshAvatar
} from "../../../profile/actions";
import { ChooseFavorites } from "../../components";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";

const EditProfile = () => {
  
  const initialState = {
    email: "",
    username: "",
    location: "",
    twitter: "",
    bio: ""
  };

  const [state, setState] = useState(initialState)
  const dispatch = useDispatch();
  const { profile } = useSelector( state => state.profile );
  const auth = useSelector( state => state.auth );
  const { gravatar, favorites } = profile;


  useEffect(() => {
    if (!auth.isLoading && auth.user && (Object.keys(profile).length === 0)) {
      dispatch(loadProfile(auth.user.username));
    }
  }, [auth.user, auth.isLoading, profile]);

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      const { email, username, location, twitter, bio } = profile;
      setState(prevState => ({ ...prevState, email, username, location, twitter, bio }));
    }
  }, [profile]);

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setState(prevState => ({ ...prevState, [name]:value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(editProfile(state));
  };

  const handleRefreshAvatar = () => {
    dispatch(refreshAvatar(auth.user.username));
    window.location.reload();
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <Form className="edit-profile-form" onSubmit={handleSubmit}>
            <Form.Field>
              <label>Username</label>
              <input
                name="username"
                value={state.username}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Email address</label>
              <input
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Location</label>
              <input
                name="location"
                value={state.location ? state.location : ""}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Twitter</label>
              <input
                name="twitter"
                value={state.twitter ? state.twitter : ""}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Bio</label>
              <textarea
                name="bio"
                value={state.bio ? state.bio : ""}
                onChange={handleChange}
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
          <ChooseFavorites favorites={favorites} />
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
                <Form className="avatar-form" onSubmit={handleRefreshAvatar}>
                  <Form.Field>
                    <label>Avatar</label>
                    We use a <a href="https://en.gravatar.com/">
                      Gravatar
                    </a>{" "}
                    that matches the email address on your account.
                  </Form.Field>
                  <Button
                    className="default"
                    floated="right"
                    fluid
                    type="submit"
                  >
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

export default EditProfile;
