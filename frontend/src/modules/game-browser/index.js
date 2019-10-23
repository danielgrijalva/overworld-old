import React from "react";
import "./styles.css";
import { getPopular, getGameData } from "./actions";
import { connect } from "react-redux";
import { Backdrop } from "../app/components";
import GameTile from "./components/gametile";
import FilterBar from "./components/filterbar/filterBar";

class GameBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        genre: [],
        date: [null, null], //[before, after]
      },
      filteredGames: []
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
    if (key === "genre") {
      filters[key] = filters[key].filter(val => val.name !== filter.name); //remove element of value filter from the array
    } else if (key === "date") {
      if (filter.order === "Before") {
        filters.date[0] = null;
      } else {
        filters.date[1] = null;
      }
    }
    this.setState({
      ...this.state,
      filters: filters,
      filteredGames: this.applyFilters(filters)
    });
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

  hasActiveFilters = () => {
    const filters = {...this.state.filters}
    return(filters.genre.length || filters.date[0] || filters.date[1])
  }

  handleFilterChange = (result, type) => {
    const filters = { ...this.state.filters };
    if (type === "genre" && !filters.genre.includes(result))
      filters.genre.push(result);
    else if (type === "date" && !filters.date.includes(result)) {
      if (result.order === "Before") filters.date[0] = result;
      else if (result.order === "After") filters.date[1] = result;
    } else return; //return if no new filters added

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
    if (filters.date[1]) {
      filteredGames = filteredGames.filter(
        game => game.first_release_date >= filters.date[1].utc
      );
    }
    if (filters.date[0]) {
      filteredGames = filteredGames.filter(
        game => game.first_release_date <= filters.date[0].utc
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
          <FilterBar
            setFilter={this.handleFilterChange}
            filters={{ ...this.state.filters }}
            activePicker={this.state.activePicker}
            removeFilter={this.removeFilters}
          />
          <div className="game-grid">
            {this.state.filteredGames.map((game, index) => {
              return <GameTile game={game} key={"game" + index} />;
            })}
          </div>
        </React.Fragment>
      );
    } 
    else if (this.hasActiveFilters()){
      return (
        <React.Fragment>
        <h1 className="title">Check out some current popular games!</h1>
        <FilterBar
          setFilter={this.handleFilterChange}
          filters={this.state.filters}
          activePicker={this.state.activePicker}
          removeFilter={this.removeFilters}
        />
        <h1>No Games found matching those filters.</h1>
        </React.Fragment>
      )
    }
    else {
      //if data not get loaded display 20 loading tiles
      return (
        <React.Fragment>
          <h1 className="title">Check out some current popular games!</h1>
          <FilterBar
            setFilter={this.handleFilterChange}
            filters={this.state.filters}
            activePicker={this.state.activePicker}
            removeFilter={this.removeFilters}
          />
          <div className="game-grid">
            {[...Array(20).keys()].map((val, index) => {
              return (
                <div className="game-box" key={"game" + index}>
                  <GameTile game={null} />
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
