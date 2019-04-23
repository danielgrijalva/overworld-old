import React from "react";
import { Container } from "semantic-ui-react";
import axios from "axios";
import Moment from "react-moment";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {},
      isLoading: false,
      cover: ""
    };

    this.loadGame = this.loadGame.bind(this);
    this.getCover = this.getCover.bind(this);
    this.getCompany = this.getCompany.bind(this);
  }

  componentWillReceiveProps(props) {
    this.loadGame(props.location.state);
  }

  componentWillMount() {
    this.loadGame(this.props.location.state);
  }

  loadGame(game) {
    this.setState({ isLoading: true });

    if (game) {
      this.getCover(game.cover);
      this.getCompany(game.involved_companies[0]);
      this.setState({ game: game, isLoading: false });
    } else {
      // user entered the page directly
      // should fetch the game by reading the slug
      // and then calling the Search API
      console.log("fetching...");
    }
  }

  getCover(id) {
    axios
      .get(`/api/covers/${id}`)
      .then(response => {
        this.setState({ cover: response.data[0].image_id });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getCompany(id) {
    axios
      .get(`/api/companies/${id}`)
      .then(response => {
        this.setState({ company: response.data[0].name });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { game, isLoading, cover, company } = this.state;

    return (
      <Container>
        <p>{game.name}</p>
        <p>{game.summary}</p>
        <div>
          <Moment unix format="DD/MM/YYYY">
            {game.first_release_date}
          </Moment>
          {!isLoading ? (
            <React.Fragment>
              <p>{company}</p>
              <img
                alt="cover"
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg`}
              />
            </React.Fragment>
          ) : (
            <p>loading image</p>
          )}
        </div>
      </Container>
    );
  }
}

export default Game;
