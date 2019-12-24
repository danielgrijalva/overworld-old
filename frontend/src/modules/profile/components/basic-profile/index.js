import React from "react";
import { Icon, Button } from "semantic-ui-react";
import { follow, unfollow } from "../../actions";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";

const BasicProfile = () => {
  const dispatch = useDispatch();
  const { username, location, twitter, me, followingUser } = useSelector(
    state => state.profile.profile
  );

  return (
    <>
      <h2>{username}</h2>
      <div className="profile-info">
        {location && (
          <span>
            <Icon name="map marker alternate" />
            {location}
          </span>
        )}
        {twitter && (
          <span>
            <Icon name="twitter" />
            <a href={`http://twitter.com/${twitter}`}>{twitter}</a>
          </span>
        )}
      </div>
      {me && me.username === username && (
        <Button className="default" compact size="tiny" as="a" href="/settings">
          Edit Profile
        </Button>
      )}
      {me && me.username !== username ? (
        <>
          {followingUser ? (
            <Button
              className="following"
              compact
              size="tiny"
              color="blue"
              onClick={() => dispatch(unfollow(username))}
            />
          ) : (
            <Button
              compact
              size="tiny"
              color="green"
              onClick={() => dispatch(follow(username))}
            >
              Follow
            </Button>
          )}
        </>
      ) : null}
    </>
  );
};

export default BasicProfile;
