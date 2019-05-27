import React, { Component } from "react";
import { connect } from "react-redux";
import { loadProfile } from "../../actions/profile";
import {
  Container,
  Segment,
  Icon,
  Grid,
  Statistic,
  Menu,
  Divider,
  Image,
  Message
} from "semantic-ui-react";
import "./Profile.css";
import "../landing/components/popular/Popular.css";
import { Footer } from "../app/components/footer/Footer";

class Profile extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  componentWillMount() {
    this.props.loadProfile();
  }

  render() {
    const { username } = this.props.profile;
    const { activeItem } = this.state;
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Container>
            <Segment basic className="profile-header">
              <Grid>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <Image
                      src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                      circular
                      className="profile-avatar"
                      size="tiny"
                    />
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle" width={8}>
                    <h2>{username}</h2>
                    <p>
                      <span>
                        <Icon name="map marker alternate" />
                        Portland, OR
                      </span>
                      <span>
                        <Icon name="twitter" />
                        <a href="#">PunisherIV</a>
                      </span>
                    </p>
                  </Grid.Column>
                  <Grid.Column
                    width={6}
                    className="stats"
                    verticalAlign="middle"
                  >
                    <Statistic size="tiny">
                      <Statistic.Value>1.2k</Statistic.Value>
                      <Statistic.Label>Games</Statistic.Label>
                    </Statistic>
                    <Statistic size="tiny">
                      <Statistic.Value>10</Statistic.Value>
                      <Statistic.Label>Backlog</Statistic.Label>
                    </Statistic>
                    <Statistic size="tiny">
                      <Statistic.Value>2</Statistic.Value>
                      <Statistic.Label>Lists</Statistic.Label>
                    </Statistic>
                    <Statistic size="tiny">
                      <Statistic.Value>16.4k</Statistic.Value>
                      <Statistic.Label>Followers</Statistic.Label>
                    </Statistic>
                    <Statistic size="tiny">
                      <Statistic.Value>27</Statistic.Value>
                      <Statistic.Label>Following</Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment basic>
              <Container className="profile-menu-wrapper" textAlign="center">
                <Menu borderless compact className="profile-menu">
                  <Menu.Item
                    name="profile"
                    active={activeItem === "profile"}
                    onClick={this.handleItemClick}
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    name="games"
                    active={activeItem === "games"}
                    onClick={this.handleItemClick}
                  >
                    Games
                  </Menu.Item>
                  <Menu.Item
                    name="likes"
                    active={activeItem === "likes"}
                    onClick={this.handleItemClick}
                  >
                    Likes
                  </Menu.Item>
                  <Menu.Item
                    name="reviews"
                    active={activeItem === "reviews"}
                    onClick={this.handleItemClick}
                  >
                    Reviews
                  </Menu.Item>
                  <Menu.Item
                    name="backlog"
                    active={activeItem === "backlog"}
                    onClick={this.handleItemClick}
                  >
                    Backlog
                  </Menu.Item>
                  <Menu.Item
                    name="wishlist"
                    active={activeItem === "wishlist"}
                    onClick={this.handleItemClick}
                  >
                    Wish List
                  </Menu.Item>
                  <Menu.Item
                    name="lists"
                    active={activeItem === "lists"}
                    onClick={this.handleItemClick}
                  >
                    Lists
                  </Menu.Item>
                  <Menu.Item
                    name="journal"
                    active={activeItem === "journal"}
                    onClick={this.handleItemClick}
                  >
                    Journal
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>
            <Segment className="profile-content" basic>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={11}>
                    <Divider horizontal>Favorite Games</Divider>
                    <div className="games-wrapper">
                      <React.Fragment>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="placeholder" />
                        ))}
                      </React.Fragment>
                    </div>

                    <Divider horizontal>Recent Activity</Divider>
                    <div className="games-wrapper">
                      <React.Fragment>
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="placeholder" />
                        ))}
                      </React.Fragment>
                    </div>
                    <Divider horizontal>Reviews</Divider>
                    <Message
                      icon="question circle outline"
                      content="No reviews yet"
                    />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Divider horizontal>Bio</Divider>
                    <p class="profile-bio">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
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
  { loadProfile }
)(Profile);
