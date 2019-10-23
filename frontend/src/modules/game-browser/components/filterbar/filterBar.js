import React from "react";
import {
  GenreFilter,
  DateFilter,
} from "../filters";
import { Dropdown, Label } from "semantic-ui-react";

export default class FilterBar extends React.Component {
  constructor(props) {
    super();
    this.state = { activePicker: "Genre" };
    this.pickers = [
      { key: "genre", text: "Genre", value: "Genre" },
      { key: "date", text: "Date", value: "Date" },
      { key: "developer", text: "Developer", value: "Developer" }
    ];
  }
  render() {
    const setFilter = this.props.setFilter;
    const removeFilter = this.props.removeFilter
    return (
      <div className="filter-bar">
        <div className="filter-selector">
          <Dropdown
            placeholder={"Filter by..."}
            selection
            onChange={(e, { value }) =>
              this.setState({ ...this.state, activePicker: value })
            }
            options={this.pickers}
          />
          {this.state.activePicker === "Genre" && <GenreFilter setFilter={setFilter} />}
          {this.state.activePicker === "Date" && <DateFilter setFilter={setFilter} />}
        </div>
        {/*Render labels for existing filters*/}
        <div className="filter-labels">
          <Label size={"large"} pointing={"right"}>
            Active Filters:
          </Label>
          {Object.keys(this.props.filters).map(key => {
            return (
              <React.Fragment key={key}>
                {this.props.filters[key].map(filter => {
                  return (
                    filter && (
                      <Label key={key + filter.name} size={"large"}>
                        {key}: {filter.name}
                        <span
                          className="remove-button"
                          onClick={() => removeFilter(key, filter)}
                        >
                          ×
                        </span>
                      </Label>
                    )
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }
}
