import React, { Component } from "react";
import { connect } from "react-redux";
import { Divider } from "semantic-ui-react";
import moment from "moment";
import Moment from "react-moment";
import { loadJournal } from "../../actions";
import "./styles.css";

class Journal extends Component {
  componentWillMount() {
    this.props.loadJournal(this.props.username);
  }

  render() {
    const { journal } = this.props;
    if (journal.length > 0) {
      return (
        <ul className="journal">
          <Divider horizontal>Journal</Divider>
          {journal.map(year => {
            return year.months.map(month => {
              return (
                <li key={month.month}>
                  <span className="month">
                    {moment(month.month, "MM").format("MMM")}
                  </span>
                  <dl>
                    {month.entries.map(entry => {
                      return (
                        <React.Fragment key={entry.id}>
                          <dt>
                            <Moment format="D">{entry.date}</Moment>
                          </dt>
                          <dd>
                            <a href={`/games/${entry.game.slug}`}>
                              {entry.game.name}
                            </a>
                          </dd>
                        </React.Fragment>
                      );
                    })}
                  </dl>
                </li>
              );
            });
          })}
        </ul>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  journal: state.profile.journal
});

export default connect(
  mapStateToProps,
  { loadJournal }
)(Journal);
