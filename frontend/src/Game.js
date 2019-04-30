import React from "react";
import { Container, Grid } from "semantic-ui-react";
import Actions from "./actions/Actions";
import axios from "axios";
import Moment from "react-moment";
import { LazyImage } from "react-lazy-images";
import Backdrop from "./Backdrop";
import { ImageLoader, TitleLoader, ListLoader } from "./Loaders";
import "./Game.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: "",
      game: {},
      screenshots: [],
      isLoading: true,
      isCoverLoading: true,
      cover: {}
    };
  }

  componentWillReceiveProps(props) {
    if (props.location.state !== this.state.gameId) {
      const gameId = props.location.state;
      this.resetState(gameId);
      this.loadGame(gameId);
    }
  }

  componentWillMount() {
    const gameId = this.props.location.state;
    this.resetState(gameId);

    this.loadGame(gameId);
  }

  resetState = gameId => {
    this.setState({
      gameId: gameId,
      game: {},
      isLoading: true,
      isCoverLoading: true,
      cover: {}
    });
  };

  loadGame = gameId => {
    axios.all([this.loadGameInfo(gameId), this.loadScreenshots(gameId)]).then(
      axios.spread((game, scr) => {
        this.setState({
          game: game.data.results,
          screenshots: scr.data.results,
          isLoading: false
        });
      })
    );
  };

  loadGameInfo = gameId => {
    return axios.get(`/api/games/${gameId}`);
  };

  loadScreenshots = gameId => {
    return axios.get(`/api/screenshots/${gameId}`);
  };

  createMarkup = html => {
    return { __html: html };
  };

  render() {
    const { game, screenshots, isLoading } = this.state;

    return (
      <Container>
        <Grid className="game" centered>
          {!isLoading && (
            <Backdrop
              placeholder={
                screenshots.length > 0
                  ? screenshots[0].thumb_url
                  : game.images[0].thumb_url
              }
              actual={
                screenshots.length > 0
                  ? screenshots[0].original_url
                  : game.images[0].original
              }
            />
          )}
          <Grid.Row className="game-content">
            <React.Fragment>
              <Grid.Column width={4}>
                {!isLoading ? (
                  <LazyImage
                    src={game.image.small_url}
                    alt="Game cover."
                    placeholder={({ imageProps, ref }) => (
                      <img
                        {...imageProps}
                        ref={ref}
                        className="ui rounded image cover placeholder"
                        src={game.image.thumb_url}
                      />
                    )}
                    actual={({ imageProps }) => (
                      <img className="ui rounded image cover" {...imageProps} />
                    )}
                  />
                ) : (
                  <ImageLoader />
                )}
              </Grid.Column>
              <Grid.Column width={8}>
                {!isLoading ? (
                  <React.Fragment>
                    <section className="game-header margin-bottom-sm">
                      <React.Fragment>
                        <h1>{game.name}</h1>
                        <small className="release-date">
                          <a href="#">
                            <Moment format="YYYY">
                              {game.original_release_date}
                            </Moment>
                          </a>
                        </small>
                      </React.Fragment>
                    </section>
                    <section>
                      <span className="game-info margin-bottom-sm">
                        <small className="company">
                          A game by <a href="#">{game.developers[0].name}</a>
                        </small>
                      </span>
                      <span
                        style={{ textAlign: "justify" }}
                        dangerouslySetInnerHTML={this.createMarkup(game.deck)}
                      />
                    </section>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <TitleLoader />
                    <ListLoader />
                  </React.Fragment>
                )}
              </Grid.Column>
              <Grid.Column width={4}>
                <Actions />
              </Grid.Column>
            </React.Fragment>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Game;
