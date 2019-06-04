import React from "react";
import { Statistic } from "semantic-ui-react";
import "./Stats.css";

class Stats extends React.Component {
  render() {
    const { played, backlog, followers, following } = this.props.profile;
    return (
      <React.Fragment>
        <Statistic size="tiny">
          <Statistic.Value>{played.length}</Statistic.Value>
          <Statistic.Label>Games</Statistic.Label>
        </Statistic>
        <Statistic size="tiny">
          <Statistic.Value>{backlog.length}</Statistic.Value>
          <Statistic.Label>Backlog</Statistic.Label>
        </Statistic>
        <Statistic size="tiny">
          <Statistic.Value>0</Statistic.Value>
          <Statistic.Label>Lists</Statistic.Label>
        </Statistic>
        <Statistic size="tiny">
          <Statistic.Value>{followers.length}</Statistic.Value>
          <Statistic.Label>Followers</Statistic.Label>
        </Statistic>
        <Statistic size="tiny">
          <Statistic.Value>{following.length}</Statistic.Value>
          <Statistic.Label>Following</Statistic.Label>
        </Statistic>
      </React.Fragment>
    );
  }
}

export default Stats;
