import React from "react";
import { Grid, Icon, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  loadActions,
  logGame,
  likeGame,
  addToBacklog,
  addToWishlist
} from "../../../../actions/game";

class Buttons extends React.Component {
  componentWillMount() {
    const { id, name } = this.props.game;
    this.props.loadActions(id, name);
  }

  onClick = (e, { value }) => {
    const { id, name } = this.props.game;
    switch (value) {
      case "played":
        this.props.logGame(id, name);
        break;
      case "liked":
        this.props.likeGame(id, name);
        break;
      case "backlog":
        this.props.addToBacklog(id, name);
        break;
      case "wishlist":
        this.props.addToWishlist(id, name);
        break;
      default:
        break;
    }
  };

  render() {
    const { played, liked, backlog, wishlist } = this.props.actions;
    if (!this.props.loadingActions) {
      return (
        <Grid className="action-buttons">
          <Grid.Row columns={4} verticalAlign="middle">
            <Grid.Column>
              <Popup
                trigger={
                  <Icon
                    link
                    size="big"
                    value="played"
                    color={played ? "green" : null}
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
                    color={liked ? "orange" : null}
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
                    color={backlog ? "teal" : null}
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
                    color={wishlist ? "yellow" : null}
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
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  actions: state.game.actions,
  loadingActions: state.game.loadingActions
});

export default connect(
  mapStateToProps,
  {
    loadActions,
    logGame,
    likeGame,
    addToBacklog,
    addToWishlist
  }
)(Buttons);
