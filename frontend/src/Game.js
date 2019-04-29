import React from "react";
import { Container, Grid } from "semantic-ui-react";
import Actions from "./actions/Actions";
import axios from "axios";
import Moment from "react-moment";
import "./Game.css";
import ContentLoader from "react-content-loader";
import { LazyImage } from "react-lazy-images";
import Backdrop from "./Backdrop";

const TitleLoader = () => (
  <ContentLoader
    height={25}
    width={400}
    speed={1}
    primaryColor="#242b34"
    secondaryColor="#343d4c"
  >
    <rect x="0" y="0" rx="7" ry="7" width="370" height="13" />
  </ContentLoader>
);

const ImageLoader = () => (
  <ContentLoader
    height={160}
    width={200}
    speed={1}
    primaryColor="#242b34"
    secondaryColor="#343d4c"
  >
    <rect x="0" y="0" rx="4" ry="4" width="200" height="160" />
  </ContentLoader>
);

const ListLoader = () => (
  <ContentLoader
    height={110}
    width={400}
    speed={1}
    primaryColor="#242b34"
    secondaryColor="#343d4c"
  >
    <rect x="0" y="0" rx="5" ry="5" width="300" height="10" />
    <rect x="20" y="20" rx="5" ry="5" width="270" height="10" />
    <rect x="20" y="40" rx="5" ry="5" width="220" height="10" />
    <rect x="0" y="60" rx="5" ry="5" width="300" height="10" />
    <rect x="20" y="80" rx="5" ry="5" width="250" height="10" />
    <rect x="20" y="100" rx="5" ry="5" width="130" height="10" />
  </ContentLoader>
);

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
            {!isLoading ? (
              <React.Fragment>
                <Grid.Column width={8}>
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
                </Grid.Column>
                <Grid.Column width={4}>
                  <Actions />
                </Grid.Column>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <TitleLoader />
                <ListLoader />
              </React.Fragment>
            )}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Game;
