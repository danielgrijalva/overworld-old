import React from "react";
import { Menu, Grid, Icon, Popup } from "semantic-ui-react";

class Actions extends React.Component {
  constructor(props) {
    super();
    this.state = {
      liked: false,
      played: false,
      backlog: false,
      wishlist: false,
      isModalActive: false
    };
  }

  onClick = (e, { value }) => {
    console.log(value);
    switch (value) {
      case "played":
        this.setState(prevState => ({
          played: !prevState.played
        }));
        break;
      case "liked":
        this.setState(prevState => ({
          liked: !prevState.liked
        }));
        break;
      case "backlog":
        this.setState(prevState => ({
          backlog: !prevState.backlog
        }));
        break;
      case "wishlist":
        this.setState(prevState => ({
          wishlist: !prevState.wishlist
        }));
        break;
    }
  };

  closeModal = () => {
    this.setState({ isModalActive: false });
  };

  render() {
    const { played, liked, backlog, wishlist, isModalActive } = this.state;
    return (
      <Menu icon="labeled" className="actions" vertical fluid>
        <Menu.Item>
          <Grid>
            <Grid.Row centered columns={4} verticalAlign="middle">
              <Grid.Column textAlign="center">
                <Popup
                  trigger={
                    <Icon
                      link
                      size="big"
                      value="played"
                      color={played ? "green" : ""}
                      name={played ? "check circle" : "check circle outline"}
                      onClick={this.onClick}
                    />
                  }
                  content={"Played"}
                  position="top center"
                  size="tiny"
                  inverted
                />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Popup
                  trigger={
                    <Icon
                      link
                      size="big"
                      value="liked"
                      color={liked ? "pink" : ""}
                      name={liked ? "heart" : "heart outline"}
                      onClick={this.onClick}
                    />
                  }
                  content={"Like"}
                  position="top center"
                  size="tiny"
                  inverted
                />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Popup
                  trigger={
                    <Icon
                      link
                      size="big"
                      value="backlog"
                      color={backlog ? "yellow" : ""}
                      name={backlog ? "clock" : "clock outline"}
                      onClick={this.onClick}
                    />
                  }
                  content={"Add to backlog"}
                  position="top center"
                  size="tiny"
                  inverted
                />
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Popup
                  trigger={
                    <Icon
                      link
                      size="big"
                      value="wishlist"
                      color={wishlist ? "blue" : ""}
                      name="gift"
                      onClick={this.onClick}
                    />
                  }
                  content={"Add to wishlist"}
                  position="top center"
                  size="tiny"
                  inverted
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Menu.Item>
        <Menu.Item content="Review or log" link />
        <Menu.Item content="Add to a list" link />
      </Menu>
    );
  }
}

export default Actions;
