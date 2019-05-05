import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import { Search, Grid, Label } from "semantic-ui-react";

const resultRenderer = ({ id, name, expected_release_year, original_release_date }) => {
  if (original_release_date) {
    const year = original_release_date.substring(0, 4);
    return <Label key={id} content={`${name} (${year})`} />;
  } else if(expected_release_year){
    return <Label key={id} content={`${name} (${expected_release_year})`} />;
  }
  else {
    return <Label key={id} content={name} />;    
  }
};

class GameSearch extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      isLoading: false,
      value: ""
    };

    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ results: [], isLoading: false, value: "" });
    this.props.history.push(`/games/${result.guid}`, result.guid);
  };

  search = debounce(value => {
    axios
      .get(`/api/search/${value}`)
      .then(response => {
        console.log(response);
        const results = response.data.results.map(result => ({
          ...result,
          key: result.guid
        }));
        this.setState({ results: results, isLoading: false });
      })
      .catch(function(error) {
        console.log(error);
      });
  }, 300);

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
            resultRenderer={resultRenderer}
            placeholder={"Search"}
            value={value}
            noResultsMessage={"No games found"}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(GameSearch);
