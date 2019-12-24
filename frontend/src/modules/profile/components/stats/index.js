import React from "react";
import PropTypes from "prop-types";
import { Statistic } from "semantic-ui-react";
import "./styles.css";

const Stats = (props) => {
  const { played, backlog, wishlist, followers, following } = props.profile;
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
        <Statistic.Value>{wishlist.length}</Statistic.Value>
        <Statistic.Label>Wishlist</Statistic.Label>
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

Stats.propTypes = {
  played: PropTypes.array,
  backlog: PropTypes.array,
  followers: PropTypes.array,
  following: PropTypes.array
};

export default Stats;
