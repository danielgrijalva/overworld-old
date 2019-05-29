import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { debounce } from "lodash";
import { Search, Grid } from "semantic-ui-react";
import { ResultRenderer } from "./ResultRenderer";
import "./Search.css";

class GameSearch extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      isLoading: false,
      value: ""
    };
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ results: [], isLoading: false, value: "" });
    this.props.history.push(`/games/${result.slug}`, result.id);
  };

  search = debounce(value => {
    axios
      .get(`/api/search/${value}`)
      .then(response => {
        const results = response.data.map(result => ({
          ...result,
          key: result.id
        }));
        this.setState({ results: results, isLoading: false });
      })
      .catch(function(error) {
        console.log(error);
      });
  }, 350);

  onChange = value => {
    if (value.length < 1) {
      this.setState({ isLoading: false, results: [], value: "" });
    } else {
      this.setState({ isLoading: true, value: value });
      this.search(value);
    }
  };

  render() {
    const { results, isLoading, value } = this.state;
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={e => this.onChange(e.target.value)}
            results={results}
            resultRenderer={ResultRenderer}
            value={value}
            noResultsMessage={"No games found"}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(GameSearch);
