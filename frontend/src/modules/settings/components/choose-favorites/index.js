import React from "react";
import { Modal, Form, Button, Header, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { GameSearch } from "../../../app/components";
import { addFavorite, removeFavorite } from "../../actions";
import "./styles.css";

class ChooseFavorites extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  handleRemove = gameId => {
    this.props.removeFavorite(gameId);
  };

  handleResultSelect = result => {
    this.props.addFavorite(result);
    this.setState({ open: false });
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false });

  render() {
    const { favorites } = this.props;
    if (favorites) {
      return (
        <Form>
          <Form.Field>
            <label>Favorite Games</label>
          </Form.Field>
          <div className="choose-favorites-wrapper">
            {favorites.map((g, i) => {
              return (
                <div className="favorite-game-wrapper" key={i}>
                  <Image
                    rounded
                    src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${g.cover_id}.jpg`}
                    className="game-cover"
                  />

                  <div key={i} className="favorite-overlay">
                    <Button
                      onClick={() => this.handleRemove(g.igdb)}
                      circular
                      className="remove-favorite"
                      icon="remove"
                    />
                  </div>
                </div>
              );
            })}
            {[...Array(5 - favorites.length)].map((_, i) => (
              <div key={i} className="placeholder">
                <Modal
                  size="mini"
                  open={this.state.open}
                  onClose={this.handleClose}
                  closeIcon
                  className="register pick-favorites-modal"
                  trigger={
                    <Button
                      onClick={this.handleOpen}
                      circular
                      className="add-favorite"
                      icon="plus"
                    />
                  }
                >
                  <Modal.Content>
                    <Modal.Description>
                      <Header>Add a favorite game</Header>
                    </Modal.Description>
                    <GameSearch
                      autoFocus
                      onResultSelect={this.handleResultSelect}
                    />
                  </Modal.Content>
                </Modal>
              </div>
            ))}
          </div>
        </Form>
      );
    } else {
      return null;
    }
  }
}

export default connect(null, { addFavorite, removeFavorite })(ChooseFavorites);
