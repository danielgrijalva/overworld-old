import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Segment,
  Grid,
  Divider,
  Image,
  Message
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  Backdrop,
  Footer,
  Cover,
  Ratings,
  ListPreview
} from "../app/components/";
import { loadProfile, loadRatings } from "./actions";
import {
  ProfileNav,
  Stats,
  Journal,
  RecentActivity,
  BasicProfile
} from "./components";
import "./styles.css";

const Profile = props => {
  const dispatch = useDispatch();
  const { profile, isLoading, ratings } = useSelector(state => state.profile);

  useEffect(() => {
    const { username } = props.match.params;
    dispatch(loadProfile(username));
    dispatch(loadRatings(username));
  }, []);

  const { username, gravatar, bio, favorites, backlog, wishlist, me } = profile;

  if (!isLoading) {
    return (
      <>
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
                <Grid.Column computer={7} mobile={5}>
                  <BasicProfile />
                </Grid.Column>
                <Grid.Column width={7} className="stats" verticalAlign="middle">
                  <Stats profile={profile} />
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
                    <div className="games-wrapper">
                      {favorites.map((g, i) => {
                        return (
                          <Cover
                            key={i}
                            imageId={g.cover_id}
                            slug={g.slug}
                            size="small"
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <Message className="no-content">
                      {me && me.username === username ? (
                        <p>
                          Remember to add your{" "}
                          <Link to="/settings">favorite games!</Link>
                        </p>
                      ) : (
                        <p>{username} has no favorite games yet.</p>
                      )}
                    </Message>
                  )}
                  <RecentActivity username={username} />
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
                    <>
                      <Divider horizontal>Bio</Divider>
                      <p className="profile-bio">{bio}</p>
                    </>
                  )}
                  <Journal me={me} username={username} />
                  <Ratings ratings={ratings} showAverage={false} />
                  <Divider horizontal>Backlog</Divider>
                  {backlog.length > 0 ? (
                    <ListPreview games={backlog} />
                  ) : (
                    <Message className="no-content">
                      {me && me.username === username ? (
                        <p>
                          Keep track of what you want to play. <br />
                          <Link to="/games">Add some games now?</Link>
                        </p>
                      ) : (
                        <p>Wow, {username} has an empty backlog!</p>
                      )}
                    </Message>
                  )}
                  <Divider horizontal>Wish List</Divider>
                  {wishlist.length > 0 ? (
                    <ListPreview games={wishlist} />
                  ) : (
                    <Message className="no-content">
                      {me && me.username === username ? (
                        <p>
                          The games you wanna buy go here. <br />
                          <Link to="/games">Browse or search games?</Link>
                        </p>
                      ) : (
                        <p>Nothing here yet!</p>
                      )}
                    </Message>
                  )}
                  <Divider horizontal>Lists</Divider>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
        <Footer />
      </>
    );
  } else {
    return null;
  }
};

Profile.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  loadProfile: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired
};

export default Profile;
