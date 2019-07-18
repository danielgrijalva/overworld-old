import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Divider, Message, Image } from "semantic-ui-react";
import { loadActivity } from "../../actions";
import "./styles.css";

class RecentActivity extends React.Component {
  componentWillMount() {
    this.props.loadActivity(this.props.username);
  }

  stringifyStars = value => {
    let stars = "★".repeat(value);
    if (value % 1) {
      stars += "½";
    }
    return stars;
  };

  render() {
    const { activity } = this.props;
    return (
      <React.Fragment>
        <Divider horizontal>Recent Activity</Divider>
        {activity.length > 0 ? (
          <div className="recent-wrapper">
            {activity.map((g, i) => {
              return (
                <div className="small-cover-wrapper">
                  <Link to={`/games/${g.game.slug}`} className="cover-link">
                    <Image
                      src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                        g.game.cover_id
                      }.jpg`}
                      rounded
                      fluid
                      className="cover"
                    />
                  </Link>
                  <span>{this.stringifyStars(g.rating)}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <Message className="no-content">
            <p>No activity.</p>
          </Message>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  activity: state.profile.activity
});

export default connect(
  mapStateToProps,
  { loadActivity }
)(RecentActivity);
