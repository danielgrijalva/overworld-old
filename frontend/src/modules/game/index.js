import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Moment from "react-moment";
import { Container, Grid } from "semantic-ui-react";
import { Backdrop, Footer, Cover } from "../app/components/";
import {
  Details,
  CoverLoader,
  Actions,
  TitleLoader,
  TextLoader,
  ActionsLoader
} from "./components/";
import "./styles.css";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSlug: "",
      game: {},
      isLoading: true
    };
  }

  componentWillMount() {
    var gameSlug = this.props.match.params.slug;
    this.resetState(gameSlug);
    this.loadGame(gameSlug);
  }

  //call this function to update state of a new game
  componentDidUpdate() {
    if (this.props.match.params.slug !== this.state.gameSlug) {
      const gameSlug = this.props.match.params.slug;
      this.resetState(gameSlug);
      this.loadGame(gameSlug);
    }
  }

  //resets game state
  resetState = gameSlug => {
    this.setState({
      gameSlug: gameSlug,
      game: {},
      isLoading: true
    });
  };

  //loads the new game
  loadGame = gameSlug => {
    axios.get(`/api/games/${gameSlug}`).then(res => {
      this.setState({
        game: res.data[0],
        isLoading: false
      });
    });
  };

  //either returns a developer or an empty array
  getPublisherName = companies => {
    console.log(companies);
    var dev = companies.find(c => {
      return c.developer;
    });
    console.log(dev);

    return dev.company.name;
  };

  render() {
    const { game, isLoading } = this.state;
    return (
      <React.Fragment>
        <Container>
          <Grid className="game" centered>
            {!isLoading && this.state.game.screenshots && (
              <Backdrop imageId={game.screenshots[0].image_id} />
            )}
            <Grid.Row className="game-content">
              <React.Fragment>
                <Grid.Column width={4}>
                  {/* Game cover/poster */}
                  {!isLoading ? (
                    <React.Fragment>
                      <Cover
                        imageId={game.cover.image_id}
                        slug={game.slug}
                        className="cover-wrapper"
                        size="big"
                      />
                    </React.Fragment>
                  ) : (
                    <CoverLoader />
                  )}
                </Grid.Column>
                <Grid.Column width={12}>
                  {/* Game title */}
                  {!isLoading ? (
                    <section className="game-header margin-bottom-sm">
                      <h1>{game.name}</h1>
                      {game.first_release_date && (
                        <small className="release-date">
                          <a href="/">
                            <Moment format="YYYY">
                              {game.first_release_date * 1000}
                            </Moment>
                          </a>
                        </small>
                      )}
                      <small className="company">
                        <a href="/">
                          {game.involved_companies &&
                            this.getPublisherName(game.involved_companies)}
                        </a>
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

Game.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired
    })
  })
};
