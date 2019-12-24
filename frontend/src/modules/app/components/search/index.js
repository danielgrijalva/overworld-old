import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { debounce } from "lodash";
import { Search, Grid } from "semantic-ui-react";
import { ResultRenderer } from "./ResultRenderer";
import "./styles.css";

const GameSearch = ({ onResultSelect, autoFocus }) => {
  const defaultState = {
    results: [],
    isLoading: false,
    value: ""
  }

  const [{ results, isLoading, value }, setState] = useState(defaultState);

  const handleResultSelect = (e, { result }) => {
    setState(defaultState);
    onResultSelect(result);
  };

  const search = debounce(value => {
    axios
      .get(`/api/games/search/${value}`)
      .then(response => {
        const results = response.data.map(result => ({
          ...result,
          key: result.id
        }));
        setState(prevState => ({
          ...prevState,
          results: results,
          isLoading: false
        }));
      })
      .catch(function(error) {
        console.log(error);
      });
  }, 350);

  const onChange = value => {
    if (value.length < 1) {
      setState(defaultState);
    } else {
      setState(prevState => ({ ...prevState, isLoading: true, value: value }));
      search(value);
    }
  };

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={e => onChange(e.target.value)}
          results={results}
          placeholder='Search...'
          resultRenderer={ResultRenderer}
          value={value}
          noResultsMessage={"No games found"}
          autoFocus={autoFocus}
        />
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(GameSearch);
