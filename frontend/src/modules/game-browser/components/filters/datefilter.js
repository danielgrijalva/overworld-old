import React from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { Form, Dropdown } from "semantic-ui-react";

const initialState = {
  order: "after",
  dateString: "",
  utc: 0,
  name: ""
};

const orders = [
  { key: "after", text: "After: ", value: "After" },
  { key: "before", text: "Before: ", value: "Before" }
];
class DateFilter extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  handleDateChange = (event, { name, value }) => {
    const newState = {
      ...this.state,
      dateString: value,
      utc: Math.round(Date.parse(value)/1000),
      name: this.state.order + ": " + value
    };
    this.props.setFilter(newState, "date");
    this.setState(newState)
  };

  handleOrderChange = (event, { name, value }) => {
    this.setState({ ...this.state, order: value });
  };

  render() {
    return (
      <Form>
        <div className="horizontal-container">
          <Dropdown
            placeholder={"Filter before/after date..."}
            selection
            onChange={this.handleOrderChange}
            options={orders}
            compact
          />
          {/*
            This date picker is really heavy and kind of noticeably slow, 
            but it fits with the semantic ui style and 
            semantic ui itself doesn't provide a date picker 
            TODO -- better date picker
          */}
          <DateInput
            name="date"
            placeholder="Select a Date"
            value={this.state.dateString}
            iconPosition="left"
            onChange={this.handleDateChange}
            closable
            dateFormat={"YYYY-MM-DD"}
            pickerStyle={{ backgroundColor: "#fff" }}
            pickerWidth="100%"
          />
        </div>
      </Form>
    );
  }
}

export default DateFilter;
