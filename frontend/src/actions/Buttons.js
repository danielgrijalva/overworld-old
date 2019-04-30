import React from "react";
import { Grid, Icon, Popup } from "semantic-ui-react";

export default class Buttons extends React.Component {
  constructor(props) {
    super();
    this.state = {
      liked: false,
      played: false,
      backlog: false,
      wishlist: false
    };
  }

  onClick = (e, { value }) => {
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
      default:
        break;
    }
  };
  render() {
    const { played, liked, backlog, wishlist } = this.state;

    return (
      <Grid className="action-buttons">
        <Grid.Row centered columns={4} verticalAlign="middle">
          <Grid.Column textAlign="center">
            <Popup
              trigger={
                <Icon
                  link
                  size="big"
                  value="played"
                  color={played ? "green" : ""}
                  name="circle check"
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
                  color={liked ? "orange" : ""}
                  name="heart"
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
                  color={backlog ? "teal" : ""}
                  name="clock"
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
                  color={wishlist ? "yellow" : ""}
                  name="shop"
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
    );
  }
}
