import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Segment,
  Icon,
  Grid,
  Divider,
  Image,
  Button,
  Message
} from "semantic-ui-react";
import { Cover } from "../game/components";
import { Backdrop, Footer } from "../app/components/";
import { loadProfile, follow, unfollow } from "./actions";
import { ProfileNav, Stats, Journal } from "./components";
import "./styles.css";

class Profile extends Component {
  componentWillMount() {
    const { username } = this.props.match.params;
    this.props.loadProfile(username);
  }

  render() {
    const {
      username,
      gravatar,
      bio,
      location,
      twitter,
      favorites,
      me
    } = this.props.profile;
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Container>
            {favorites.length > 0 && (
              <Backdrop imageId={favorites[0].backdrop_id} />
            )}
            <Segment basic className="profile-header">
              <Grid>
                <Grid.Row className="">
                  <Grid.Column mobile={2}>
                    <Image
                      src={gravatar}
                      circular
                      className="profile-avatar"
                      size="tiny"
                    />
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" computer={7} mobile={5}>
                    <h2>{username}</h2>
                    <div className="profile-info">
                      {location && (
                        <span>
                          <Icon name="map marker alternate" />
                          {location}
                        </span>
                      )}
                      {twitter && (
                        <span>
                          <Icon name="twitter" />
                          <a href={`http://twitter.com/${twitter}`}>
                            {twitter}
                          </a>
                        </span>
                      )}
                    </div>
                    {me && me.username === username && (
                      <Button
                        className="default"
                        compact
                        size="tiny"
                        as="a"
                        href="/settings"
                      >
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
                    <Stats
                      played={this.props.profile.played}
                      backlog={this.props.profile.backlog}
                      wishlist={this.props.profile.wishlist}
                      followers={this.props.profile.followers}
                      following={this.props.profile.following}
                    />
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
                    {favorites.length > 0 ? (
                      <div class="games-wrapper">
                        {favorites.map((g, i) => {
                          return (
                            <Cover
                              key={i}
                              imageId={g.cover_id}
                              slug={g.slug}
                              className="small-cover-wrapper"
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <Message className="no-content">
                        {username} has no favorite games yet.
                      </Message>
                    )}
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
                      <h1>A review</h1>
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
                        <p className="profile-bio">{bio}</p>
                      </React.Fragment>
                    )}
                    <Journal username={username} />
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

Profile.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  loadProfile: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.profile,
  isLoading: state.profile.isLoading
});

export default connect(
  mapStateToProps,
  { loadProfile, follow, unfollow }
)(Profile);
