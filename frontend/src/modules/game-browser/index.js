import React from "react";
import "./styles.css";
import { getPopular, getGameData } from "./actions";
import { connect } from "react-redux";
import { Button, Label, Dropdown } from "semantic-ui-react";
import { Backdrop } from "../app/components";
import { GenreFilter, DateFilter, DeveloperFilter } from "./components/filters";
import GameTile from "./components/gametile";

const pickers = [
  { key: "genre", text: "Genre", value: "Genre" },
  { key: "date", text: "Date", value: "Date" },
  { key: "developer", text: "Developer", value: "Developer" }
];

class GameBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        genre: [],
        date: [],
        developer: []
      },
      filteredGames: [],
      activePicker: "Genre"
    };
  }
  componentWillMount() {
    this.props.getPopular(20); //get the twenty most popular games
  }

  componentDidUpdate(prevProps, prevState) {
    //get game data when popular updates
    if (this.props.popular !== prevProps.popular) {
      const slugs = this.props.popular.map(game => {
        return game.slug;
      });
      this.props.getGameData(slugs);
    } else if (
      JSON.stringify(this.props.games) !== JSON.stringify(prevProps.games) ||
      JSON.stringify(this.state.filters) !== JSON.stringify(prevState.filters)
    ) {
      //filter games on new game data or new filters
      this.setState({
        ...this.state,
        filteredGames: this.applyFilters(this.state.filters)
      });
    }
  }

  removeFilters = (key, filter) => {
    let filters = { ...this.state.filters };
    filters[key] = filters[key].filter(val => val.name !== filter.name); //remove element of value filter from the array
    this.setState({
      ...this.state,
      filters: filters,
      filteredGames: this.applyFilters(filters)
    });
  };

  renderFilters = () => {
    const filters = { ...this.state.filters };
    const activePicker = this.state.activePicker;
    return (
      <div className="filter-bar">
        <div className="filter-selector">
          <Dropdown
            placeholder={"Filter by..."}
            selection
            onChange={(e, { value }) =>
              this.setState({ ...this.state, activePicker: value })
            }
            options={pickers}
          />
          {activePicker === "Genre" && (
            <GenreFilter setFilter={this.handleFilterChange} />
          )}
        </div>
        {/*Render labels for existing filters*/}
        <div className="filter-labels">
          <Label size={"large"} pointing={"right"}>
            Active Filters:
          </Label>
          {Object.keys(filters).map(key => {
            return (
              <React.Fragment key={key}>
                {filters[key].map(filter => {
                  return (
                    <Label key={key + filter.name} size={"large"}>
                      {key}: {filter.name}
                      <span
                        className="remove-button"
                        onClick={() => this.removeFilters(key, filter)}
                      >
                        ×
                      </span>
                    </Label>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
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
          ]
            .flat()
            .filter(Boolean);
        }
        return ["muv70yw3rds1cw8ymr5v.jpg"]; //default to skyrim screenshot
        //TODO get better default
      })
      .flat();
    return backgrounds[getRandomInt(0, backgrounds.length)];
  };

  loadMore = () => {
    //load more games with current filters and offset
    this.props.getPopular(20, this.props.games.length, {
      ...this.state.filters
    });
  };

  handleFilterChange = (result, type) => {
    const filters = { ...this.state.filters };
    if (type === 'genre' && !filters.genre.includes(result))
      filters.genre.push(result);
    else if (type ==='date' && !filters.date.includes(result))
      filters.date.push(result);
    else return; //return if no new filters added

    const filteredGames = this.applyFilters(filters);

    if (filteredGames.length < 20) this.loadMore(); //if there are no longer enough games, load more with filters

    this.setState({
      ...this.state,
      filters: filters,
      filteredGames: filteredGames
    });
  };

  applyFilters = filters => {
    let filteredGames = this.props.games;

    //filter to only include games with the filtered genres
    if (filters.genre.length) {
      filteredGames = filteredGames.filter(
        game =>
          game.genres &&
          filters.genre.every(filter =>
            game.genres.map(genre => genre.name).includes(filter.name)
          )
      );
    }
    return filteredGames;
  };

  render() {
    if (this.state.filteredGames.length > 0) {
      return (
        <React.Fragment>
          <h1 className="title">Check out some current popular games!</h1>
          <Backdrop imageId={this.getRandomBackground()} />
          {this.renderFilters()}
          <div className="game-grid">
            {this.state.filteredGames.map((game, index) => {
              return <GameTile game={game} key={"game" + index} />;
            })}
          </div>
          <div className="center">
            <Button onClick={this.loadMore}>Load More!</Button>
          </div>
        </React.Fragment>
      );
    } else {
      //if data not get loaded display 20 loading tiles
      return (
        <React.Fragment>
          <h1 className="title">Check out some current popular games!</h1>
          {this.renderFilters()}
          <div className="game-grid">
            {[...Array(20).keys()].map((val, index) => {
              return (
                <div className="game-box" key={"game" + index}>
                  <GameTile game={null}/>
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
  popular: state.gameBrowser.popular,
  games: state.gameBrowser.gameData
});

export default connect(
  mapStateToProps,
  { getPopular, getGameData }
)(GameBrowser);
