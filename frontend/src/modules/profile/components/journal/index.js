import React, { Component } from "react";
import { connect } from "react-redux";
import { loadJournal } from "../../actions";
import "./styles.css";

class Journal extends Component {
  componentWillMount() {
    this.props.loadJournal(this.props.username);
  }

  render() {
    const { journal } = this.props;
    return (
      <div>
        {journal.map(year => {
          return year.months.map(month => {
            return (
              <p>
                <strong>{month.month}</strong>
                {month.entries.map(entry => {
                  return <p>{entry.date} {entry.game.name}</p>;
                })}
              </p>
            );
          });
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  journal: state.profile.journal
});

export default connect(
  mapStateToProps,
  { loadJournal }
)(Journal);
