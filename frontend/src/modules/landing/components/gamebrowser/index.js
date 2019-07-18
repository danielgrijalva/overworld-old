import React from "react";
import "./styles.css";
import { getPopular, getGameData } from "../../actions";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Container, Grid, Button, Card } from "semantic-ui-react";
import { Cover, Backdrop } from "../../../app/components";
import {
  TileCoverLoader,
  TextLoader
} from "../../../game/components";

class GameBrowser extends React.Component {
  componentWillMount() {
    this.props.getPopular(20); //get the twenty most popular games
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

  renderTile = (game, key) => {
    const getDeveloperName = companies => {
      if (companies) {
        var dev = companies.find(c => {
          return c.developer === true;
        });
        if (dev) return dev.company.name;
      }
      return "Not Found";
    };

    if (game) {
      const description = game.summary
        ? game.summary.slice(0, 100) + "..."
        : "";

      const cover = game.cover
        ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${
            game.cover.image_id
          }.jpg`
        : null; //TODO there should be a default cover if the API doesnt provide one

      const developer = game.involved_companies
        ? getDeveloperName(game.involved_companies)
        : null;

      const date = game.first_release_date ? (
        <Moment format="YYYY">{game.first_release_date * 1000}</Moment>
      ) : null;

      const header = game.name ? game.name : null;

      return (
        <Card
          className="game-card"
          image={cover}
          header={header}
          meta={developer && date}
          description={description}
          href={"/games/" + game.slug}
          key={key}
        />
      );
    } else {
      return <Card className="game-card" image={TileCoverLoader} description={TextLoader} key={key} />;
    }
  };

  getRandomBackground = () => {
    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const backgrounds = this.props.games
      .map(game => {
        if (game.screenshots) {
          return [
            game.screenshots.map(screenshot => {
              return screenshot.image_id;
            })
          ].flat().filter(Boolean);
        }
        return [];
      })
      .flat();
    return backgrounds[getRandomInt(0, backgrounds.length)];
  };

  loadMore = () => {
    this.props.getPopular(20, this.props.games.length); //get 21 games with offset of current length of games
  };

  render() {
    if (this.props.games.length > 0) {
      return (
        <React.Fragment>
          <h1 className="title">Check out some current popular games!</h1>
          <Backdrop imageId={this.getRandomBackground()} />
          <div className="game-grid">
            {this.props.games.map((game, index) => {
              return this.renderTile(game, "game" + index);
            })}
          </div>
          <div className="center">
            <Button onClick={this.loadMore}>Load More!</Button>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h1 className="title">Check out some current popular games!</h1>
          <div className="game-grid">
            {[...Array(21).keys()].map((val, index) => {
              return (
                <div className="game-box" key={"game" + index}>
                  {this.renderTile(null)}
                </div>
              );
            })}
          </div>
        </React.Fragment>
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
