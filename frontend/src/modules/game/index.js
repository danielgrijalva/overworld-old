import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Moment from "react-moment";
import { Container, Grid } from "semantic-ui-react";
import { Backdrop, Footer } from "../app/components/";
import {
  Details,
  Cover,
  CoverLoader,
  Actions,
  TitleLoader,
  TextLoader,
  ActionsLoader
} from "./components/";
import "./styles.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSlug: "",
      game: {},
      isLoading: true
    };
  }

  componentWillReceiveProps(props) {
    if (props.match.params.slug !== this.state.gameSlug) {
      const gameSlug = props.match.params.slug;
      this.resetState(gameSlug);
      this.loadGame(gameSlug);
    }
  }

  componentWillMount() {
    var gameSlug = this.props.match.params.slug;
    this.resetState(gameSlug);
    this.loadGame(gameSlug);
  }

  resetState = gameSlug => {
    this.setState({
      gameSlug: gameSlug,
      game: {},
      isLoading: true
    });
  };

  loadGame = gameSlug => {
    axios.get(`/api/games/${gameSlug}`).then(res => {
      this.setState({
        game: res.data[0],
        isLoading: false
      });
    });
  };

  getDeveloperName = companies => {
    var dev = companies.find(c => {
      return c.developer === true;
    });

    return dev.company.name;
  };

  render() {
    const { game, isLoading } = this.state;
    return (
      <React.Fragment>
        <Container>
          <Grid className="game" centered>
            {!isLoading && <Backdrop imageId={game.screenshots[1].image_id} />}
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
                          {this.getDeveloperName(game.involved_companies)}
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

export default Game;
