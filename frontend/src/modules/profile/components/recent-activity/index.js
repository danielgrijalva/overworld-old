import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider, Message } from "semantic-ui-react";
import Cover from "../../../app/components/cover";
import { loadActivity } from "../../actions";
import "./styles.css";

const RecentActivity = props => {
  const dispatch = useDispatch();
  const { activity } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(loadActivity(props.username));
  }, [props.username]);

  return (
    <>
      <Divider horizontal>Recent Activity</Divider>
      {activity.length > 0 ? (
        <div className="recent-wrapper">
          {activity.map((g, i) => {
            return (
              <Cover
                key={i}
                imageId={g.game.cover_id}
                slug={g.game.slug}
                size="small"
              />
            );
          })}
          {[...Array(5 - activity.length)].map((_, i) => (
            <div key={i} className="placeholder" />
          ))}
        </div>
      ) : (
        <Message className="no-content">
          <p>{props.username} has not been playing much...</p>
        </Message>
      )}
    </>
  );
};

export default RecentActivity;
