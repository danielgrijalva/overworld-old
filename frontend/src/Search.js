import React, { Component } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { Search, Grid, Label } from "semantic-ui-react";

const resultRenderer = ({ id, name, title }) => (
  <Label key={id} content={name} />
);

class GameSearch extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
  }

  handleResultSelect = (e, { result }) => window.location.reload();

  onChange = debounce(value => {
    if (value.length === 0) {
      this.setState({ isLoading: false, results: [] });
    } else {
      this.setState({ isLoading: true });

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
    }
  }, 300);

  render() {
    const { results, isLoading } = this.state;
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
            noResultsMessage={"No games found."}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default GameSearch;
