import React, { Component } from "react";
import axios from "axios";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      results: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.showResults = this.showResults.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    axios
      .get(`/api/search/${data.get("name")}`)
      .then(response => {
        this.showResults(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  showResults(response) {
    this.setState({ results: response.data });
  }

  render() {
    const { results } = this.state;
    return (
      <div className="App">
        <form method="POST" onSubmit={this.onSubmit}>
          <input type="text" name="name" placeholder="search" />
          <button type="submit">Search</button>
        </form>

        {results.map(game => {
          return <p>{game.name}</p>;
        })}
      </div>
    );
  }
}

export default Search;
