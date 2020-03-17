import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { debounce } from "lodash";
import { Search, Grid } from "semantic-ui-react";
import { ResultRenderer } from "./ResultRenderer";
import "./styles.scss";

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
    this.props.onResultSelect(result);
  };

  search = debounce(value => {
    axios
      .get(`/api/games/search/${value}`)
      .then(response => {
        const results = response.data.map(result => ({
          ...result,
          key: result.id,
          title: result.name
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
    const { autoFocus } = this.props;
    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            placeholder="Search..."
            onSearchChange={e => this.onChange(e.target.value)}
            results={results}
            resultRenderer={ResultRenderer}
            value={value}
            noResultsMessage={"No games found"}
            autoFocus={autoFocus}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(GameSearch);
