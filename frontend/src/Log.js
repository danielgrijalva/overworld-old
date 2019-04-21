import React, { Component } from "react";
import axios from "axios";

class Log extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    axios
      .post("/api/log/", {
        igdb: data.get("igdb"),
        name: data.get("name")
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <form method="POST" onSubmit={this.onSubmit}>
          <input type="text" name="igdb" />
          <input type="text" name="name" />
          <button type="submit">Log</button>
        </form>
      </div>
    );
  }
}

export default Log;
