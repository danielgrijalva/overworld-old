import React from "react";
import "./styles.css";
import { getPopular, getGameData } from "../../actions";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Container, Grid } from "semantic-ui-react";
import { Cover } from "../../../app/components";
import {
  Details,
  CoverLoader,
  TitleLoader,
  ActionsLoader,
  TextLoader
} from "../../../game/components";

class GameBrowser extends React.Component {
  componentWillMount() {
    this.props.getPopular(21); //get the twenty most popular games
  }

  componentDidUpdate(prevProps) {
    //get game data when popular updates
    if (this.props.popular !== prevProps.popular) {
      const slugs = this.props.popular.map(game => {
        return game.slug;
      });
      this.props.getGameData(slugs);
    }
  }

  renderTile = game => {
    const getDeveloperName = companies => {
      if (companies) {
        var dev = companies.find(c => {
          return c.developer === true;
        });

        return dev.company.name;
      }
      return "Not Found";
    };

    if (game) {
      return (
        <Container>
          <Grid className="gametile">
            <Grid.Row className="gametile-contents">
              <Grid.Column width={7}>
                <Cover
                  imageId={game.cover.image_id}
                  slug={game.slug}
                  className="cover-wrapper"
                  size="big"
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Details game={game} />
              </Grid.Column>
              <Grid.Row>
                <Grid.Column width={6}>
                  <section className="game-header">
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
                        {getDeveloperName(game.involved_companies)}
                      </a>
                    </small>
                  </section>
                  <p className="summary">{game.summary}</p>
                </Grid.Column>
              </Grid.Row>
            </Grid.Row>
          </Grid>
        </Container>
      );
    } else {
      return (
        <Container>
          <Grid className="gametile">
            <Grid.Row className="gametile-contents">
              <Grid.Column width={7}>
                <CoverLoader />
              </Grid.Column>
              <Grid.Column width={8}>
              <ActionsLoader></ActionsLoader>
              </Grid.Column>
              <Grid.Row>
                <Grid.Column width={6}>
                  <section className="game-header">
                    <TitleLoader />
                  </section>
                  <TextLoader />
                </Grid.Column>
              </Grid.Row>
            </Grid.Row>
          </Grid>
        </Container>
      );
    }
  };

  render() {
    if (this.props.games.length > 0) {
      return (
        <React.Fragment>
          <h1 className="title">Check out some current popular games!</h1>
          <div className="game-grid">
            {this.props.games.map((game, index) => {
              return (
                <div
                  href={"/games/" + game.slug}
                  className="game-box"
                  key={"game" + index}
                >
                  {this.renderTile(game)}
                </div>
              );
            })}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div className="game-grid">
          {[...Array(21).keys()].map((val, index) => {
            return (
              <div className="game-box" key={"game" + index}>
                {this.renderTile(null)}
              </div>
            );
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  popular: state.landing.popular,
  loading: state.landing.isLoadingPopular,
  games: state.landing.gameData
});

export default connect(
  mapStateToProps,
  { getPopular, getGameData }
)(GameBrowser);
