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
    axios.get(`/api/games/${gameId}`).then(res => {
      console.log(res.data[0]);
      this.setState({
        game: res.data[0],
        isLoading: false
      });
    });
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
    const { game, isLoading } = this.state;

    return (
      <React.Fragment>
        <Container>
          <Grid className="game" centered>
            {!isLoading && <Backdrop imageId={game.screenshots[0].image_id} />}
            <Grid.Row className="game-content">
              <React.Fragment>
                <Grid.Column width={4}>
                  {/* Game cover/poster */}
                  {!isLoading ? (
                    <React.Fragment>
                      <Cover imageId={game.cover.image_id} />
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
                            {game.first_release_date * 1000}
                          </Moment>
                        </a>
                      </small>
                      {/* <small className="company">
                        <a href="/">{game.developers[0].name}</a>
                      </small> */}
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
                            <p className="summary">{game.summary}</p>
                            <Details game={game} />
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
        {!isLoading && <Footer />}
      </React.Fragment>
    );
  }
}

export default Game;
