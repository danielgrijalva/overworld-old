import React, { Component } from "react";
import { connect } from "react-redux";
import { Divider, Message } from "semantic-ui-react";
import moment from "moment";
import Moment from "react-moment";
import { loadJournal } from "../../actions";
import "./styles.css";

class Journal extends Component {
  componentDidMount() {
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
      return (
        <React.Fragment>
          <Divider horizontal>Journal</Divider>
          <Message className="no-content">
            {this.props.me && this.props.me.username === this.props.username ? (
              <p>
                Save and record everything you play. <br />
                <a href="/games">Start by logging a game!</a>
              </p>
            ) : (
              <p>{this.props.username}'s gaming journal is blank.</p>
            )}
          </Message>
        </React.Fragment>
      );
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
