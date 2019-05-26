import React from "react";
import axios from "axios";
import Moment from "react-moment";
import { Container, Grid } from "semantic-ui-react";
import Backdrop from "./components/backdrop/Backdrop";
import { Details } from "./components/details/Details";
import Actions from "./components/actions/Actions";
import { QuickStats } from "./components/quick-stats/QuickStats";
import { Cover } from "./components/cover/Cover";
import { Footer } from "../app/components/footer/Footer";
import {
  ImageLoader,
  ActionsLoader,
  TitleLoader,
  TextLoader
} from "./components/loaders/Loaders";
import "./Game.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: "",
      countries: [],
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
    var gameId = this.props.location.state;
    if (!gameId) {
      gameId = this.props.match.params.slug;
    }
    this.resetState(gameId);
    this.loadGame(gameId);
  }

  resetState = gameId => {
    this.setState({
      gameId: gameId,
      game: {},
      countries: [],
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

        this.getCountry(game.data.results.developers[0].id);
        this.getCountry(game.data.results.publishers[0].id);
      })
    );
  };

  getCountry = publisher_id => {
    axios.get(`/api/games/country/${publisher_id}`).then(response => {
      const c = response.data.results.location_country;
      if (!this.state.countries.includes(c)) {
        this.setState(prevState => {
          prevState.countries.push(c);
        });
      }
    });
  };

  loadGameInfo = gameId => {
    return axios.get(`/api/games/${gameId}`);
  };

  loadScreenshots = gameId => {
    return axios.get(`/api/screenshots/${gameId}`);
  };

  render() {
    const { game, screenshots, isLoading, countries } = this.state;

    return (
      <React.Fragment>
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
                  {/* Game cover/poster */}
                  {!isLoading ? (
                    <React.Fragment>
                      <Cover image={game.image} />
                      <QuickStats />
                    </React.Fragment>
                  ) : (
                    <ImageLoader />
                  )}
                </Grid.Column>
                <Grid.Column width={12}>
                  {/* Game title */}
                  {!isLoading ? (
                    <section className="game-header margin-bottom-sm">
                      <h1>{game.name}</h1>
                      <small className="release-date">
                        <a href="/">
                          <Moment format="YYYY">
                            {game.original_release_date}
                          </Moment>
                        </a>
                      </small>
                      <small className="company">
                        <a href="/">{game.developers[0].name}</a>
                      </small>
                    </section>
                  ) : (
                    <TitleLoader />
                  )}
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={10}>
                        {/* Game summary & details */}
                        {!isLoading ? (
                          <section>
                            <p className="summary">{game.deck}</p>
                            <Details game={game} countries={countries} />
                          </section>
                        ) : (
                          <TextLoader />
                        )}
                      </Grid.Column>
                      <Grid.Column width={6}>
                        {/* Actions menu */}
                        {!isLoading ? (
                          <Actions game={game} />
                        ) : (
                          <ActionsLoader />
                        )}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </React.Fragment>
            </Grid.Row>
          </Grid>
        </Container>
        {!isLoading && (<Footer />)}
      </React.Fragment>
    );
  }
}

export default Game;
