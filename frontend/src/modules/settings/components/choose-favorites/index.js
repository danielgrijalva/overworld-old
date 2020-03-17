import React, { useState } from "react";
import { Modal, Form, Button, Header, Image } from "semantic-ui-react";
import { GameSearch } from "../../../app/components";
import { addFavorite, removeFavorite } from "../../actions";
import "./styles.scss";
import { useDispatch } from "react-redux";

const ChooseFavorites = props => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { favorites } = props;

  const handleRemove = gameId => {
    dispatch(removeFavorite(gameId));
  };

  const handleResultSelect = result => {
    dispatch(addFavorite(result));
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

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
                    onClick={() => handleRemove(g.igdb)}
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
                open={open}
                onClose={handleClose}
                closeIcon
                className="register pick-favorites-modal"
                trigger={
                  <Button
                    onClick={handleOpen}
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
                  <GameSearch autoFocus onResultSelect={handleResultSelect} />
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
};

export default ChooseFavorites;
