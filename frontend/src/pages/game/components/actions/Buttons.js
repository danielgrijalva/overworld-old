import React from "react";
import { Grid, Icon, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import {
  loadActions,
  logGame,
  unlogGame,
  likeGame,
  unlikeGame,
  addToBacklog,
  removeFromBacklog,
  addToWishlist,
  removeFromWishlist
} from "../../../../actions/game";

class Buttons extends React.Component {
  componentWillMount() {
    const { guid, name } = this.props.game;
    this.props.loadActions(guid, name);
  }

  onClick = debounce((e, { value }) => {
    const { guid, name } = this.props.game;
    const { played, liked, backlog, wishlist } = this.props.actions;
    switch (value) {
      case "played":
        if (!played) {
          this.props.logGame(guid, name);
        } else {
          this.props.unlogGame(guid, name);
        }
        break;
      case "liked":
        if (!liked) {
          this.props.likeGame(guid, name);
        } else {
          this.props.unlikeGame(guid, name);
        }
        break;
      case "backlog":
        if (!backlog) {
          this.props.addToBacklog(guid, name);
        } else {
          this.props.removeFromBacklog(guid, name);
        }
        break;
      case "wishlist":
        if (!wishlist) {
          this.props.addToWishlist(guid, name);
        } else {
          this.props.removeFromWishlist(guid, name);
        }
        break;
      default:
        break;
    }
  }, 200);

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
    unlogGame,
    likeGame,
    unlikeGame,
    addToBacklog,
    removeFromBacklog,
    addToWishlist,
    removeFromWishlist
  }
)(Buttons);
