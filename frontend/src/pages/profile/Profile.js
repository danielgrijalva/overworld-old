import React, { Component } from "react";
import { connect } from "react-redux";
import { loadProfile, follow, unfollow } from "../../actions/profile";
import {
  Container,
  Segment,
  Icon,
  Grid,
  Divider,
  Image,
  Button
} from "semantic-ui-react";
import "./Profile.css";
import "../landing/components/popular/Popular.css";
import { Footer } from "../app/components/footer/Footer";
import Stats from "./components/stats/Stats";
import ProfileNav from "./components/nav/ProfileNav";

class Profile extends Component {
  componentWillMount() {
    const { username } = this.props.match.params;
    this.props.loadProfile(username);
  }

  render() {
    const { username, bio, location, twitter, me } = this.props.profile;
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Container>
            <Segment basic className="profile-header">
              <Grid>
                <Grid.Row>
                  <Grid.Column mobile={2}>
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      circular
                      className="profile-avatar"
                      size="tiny"
                    />
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" computer={7} mobile={5}>
                    <h2>{username}</h2>
                    <p>
                      {location && (
                        <span>
                          <Icon name="map marker alternate" />
                          {location}
                        </span>
                      )}
                      {twitter && (
                        <span>
                          <Icon name="twitter" />
                          <a href="#">{twitter}</a>
                        </span>
                      )}
                    </p>
                    {me && me.username === username && (
                      <Button compact size="tiny" as="a" href="/settings">
                        Edit Profile
                      </Button>
                    )}
                    {me && me.username !== username ? (
                      <React.Fragment>
                        {this.props.profile.followingUser ? (
                          <Button
                            className="following"
                            compact
                            size="tiny"
                            color="blue"
                            onClick={() => this.props.unfollow(username)}
                          />
                        ) : (
                          <Button
                            compact
                            size="tiny"
                            color="green"
                            onClick={() => this.props.follow(username)}
                          >
                            Follow
                          </Button>
                        )}
                      </React.Fragment>
                    ) : null}
                  </Grid.Column>
                  <Grid.Column
                    width={7}
                    className="stats"
                    verticalAlign="middle"
                  >
                    <Stats profile={this.props.profile} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment basic>
              <Container className="profile-menu-wrapper" textAlign="center">
                <ProfileNav />
              </Container>
            </Segment>
            <Segment className="profile-content" basic>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <Divider horizontal>Favorites</Divider>
                    <div className="games-wrapper">
                      <React.Fragment>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="placeholder" />
                        ))}
                      </React.Fragment>
                    </div>

                    <Divider horizontal>Recent Activity</Divider>
                    <div className="recent-wrapper">
                      <React.Fragment>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="placeholder" />
                        ))}
                      </React.Fragment>
                    </div>
                    <Divider horizontal>Reviews</Divider>
                    <div className="review">
                      <div className="review-placeholder" />
                      <h1>Dark Souls</h1>
                      <Icon.Group size="tiny">
                        <Icon size="tiny" color="yellow" name="star" />
                        <i>10</i>
                      </Icon.Group>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    {bio && (
                      <React.Fragment>
                        <Divider horizontal>Bio</Divider>
                        <p className="profile-bio">
                          {bio}
                        </p>
                      </React.Fragment>
                    )}
                    <Divider horizontal>Journal</Divider>
                    <Divider horizontal>Ratings</Divider>
                    <Divider horizontal>Backlog</Divider>
                    <Divider horizontal>Wish List</Divider>
                    <Divider horizontal>Lists</Divider>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Container>
          <Footer />
        </React.Fragment>
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
  { loadProfile, follow, unfollow }
)(Profile);
