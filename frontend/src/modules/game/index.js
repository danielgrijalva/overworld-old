import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Moment from "react-moment";
import { Container, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Backdrop, Footer, Cover, Ratings } from "../app/components/";
import {
  Details,
  CoverLoader,
  Actions,
  TitleLoader,
  TextLoader,
  ActionsLoader,
  Screenshots,
  Video,
  Similar,
  DLC,
  Expansions
} from "./components/";
import "./styles.scss";
import ShowMoreText from "react-show-more-text";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSlug: "",
      game: {},
      ratings: [],
      isLoading: true
    };
  }

  componentDidMount() {
    var gameSlug = this.props.match.params.slug;
    this.resetState(gameSlug);
    this.loadGame(gameSlug);
    this.loadGameRatings(gameSlug);
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
      ratings: [],
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

  loadGameRatings = gameSlug => {
    axios.get(`/api/games/${gameSlug}/ratings`).then(res => {
      this.setState({
        ratings: res.data
      });
    });
  };

  //either returns a developer or an empty array
  getDeveloperName = companies => {
    var dev = companies.find(c => {
      return c.developer == true;
    });

    return dev.company.name;
  };

  getDeveloperId = companies => {
    var dev = companies.find(c => {
      return c.developer == true;
    });

    return dev.company.id;
  };

  render() {
    const { game, isLoading } = this.state;
    return (
      <React.Fragment>
        <Container>
          <Grid stackable className="game" centered>
            {!isLoading && this.state.game.screenshots && (
              <Backdrop imageId={game.screenshots[0].image_id} />
            )}
            <Grid.Row className="game-content">
              <React.Fragment>
                <Grid.Column width={4}>
                  {/* Game cover/poster */}
                  <Grid.Row width="100%" className="game-poster">
                    {!isLoading ? (
                      <React.Fragment>
                        <Cover
                          imageId={game.cover.image_id}
                          slug={game.slug}
                          size="big"
                        />
                      </React.Fragment>
                    ) : (
                      <CoverLoader />
                    )}
                  </Grid.Row>
                  {/* Trailer */}
                  <Grid.Row className="trailer-button">
                    {/* the following empty columns are used as offset */}
                    <Grid.Column width={4}>
                        {!isLoading && <Video game={game} />}
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={12}>
                  {/* Game title */}
                  {!isLoading ? (
                    <section className="game-header margin-bottom-sm">
                      <h1>{game.name}</h1>
                      {game.first_release_date && (
                        <small className="release-date">
                          <Link to="/">
                            <Moment format="YYYY">
                              {game.first_release_date * 1000}
                            </Moment>
                          </Link>
                        </small>
                      )}
                      <small className="company">
                        <Link
                          to={
                            "/developer/" +
                            this.getDeveloperId(game.involved_companies)
                          }
                        >
                          {game.involved_companies &&
                            this.getDeveloperName(game.involved_companies)}
                        </Link>
                      </small>
                    </section>
                  ) : (
                    <TitleLoader />
                  )}
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={11}>
                        {/* Game summary & details */}
                        {!isLoading ? (
                          <section className="summary">
                            <ShowMoreText
                              lines={5}
                              more="more."
                              less="Less."
                              anchorClass="show"
                              children={game.summary}
                            />
                            <Details game={game} />
                          </section>
                        ) : (
                          <TextLoader />
                        )}
                      </Grid.Column>
                      <Grid.Column width={5}>
                        {/* Actions menu */}
                        {!isLoading ? (
                          <Actions game={game} />
                        ) : (
                          <ActionsLoader />
                        )}
                        <Ratings
                          ratings={this.state.ratings}
                          showAverage={true}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
              </React.Fragment>
            </Grid.Row>
            <Grid.Row>
              {/* the following empty columns are used as offset */}
              <Grid.Column width={4} />
              <Grid.Column width={9}>
                {!isLoading && <Screenshots screenshots={game.screenshots} />}
              </Grid.Column>
              <Grid.Column width={3} />
            </Grid.Row>
            <Grid.Row>
              {/* the following empty columns are used as offset */}
              <Grid.Column width={4} />
              <Grid.Column width={9}>
                {!isLoading && <Similar similar_games={game.similar_games} isLoading={isLoading} />}
              </Grid.Column>
              <Grid.Column width={3} />
            </Grid.Row>
            <Grid.Row>
              {/* the following empty columns are used as offset */}
              <Grid.Column width={4} />
              <Grid.Column width={9}>
                {!isLoading && <DLC dlcs={game.dlcs} isLoading={isLoading} />}
              </Grid.Column>
              <Grid.Column width={3} />
            </Grid.Row>
            <Grid.Row>
              {/* the following empty columns are used as offset */}
              <Grid.Column width={4} />
              <Grid.Column width={9}>
                {!isLoading && <Expansions expansions={game.expansions} isLoading={isLoading} />}
              </Grid.Column>
              <Grid.Column width={3} />
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
