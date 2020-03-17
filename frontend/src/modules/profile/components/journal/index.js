import React, { useEffect } from "react";
import { Divider, Message } from "semantic-ui-react";
import moment from "moment";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { loadJournal } from "../../actions";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";

const Journal = props => {
  const dispatch = useDispatch();
  const { journal } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(loadJournal(props.username));
  }, [props.username]);

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
                          <Link to={`/games/${entry.game.slug}`}>
                            {entry.game.name}
                          </Link>
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
          {props.me && props.me.username === props.username ? (
            <p>
              Save and record everything you play. <br />
              <Link to="/games">Start by logging a game!</Link>
            </p>
          ) : (
            <p>{props.username}'s gaming journal is blank.</p>
          )}
        </Message>
      </React.Fragment>
    );
  }
};

export default Journal;
