import React from "react";
import PropTypes from "prop-types";
import { Rating } from "semantic-ui-react";
import { connect } from "react-redux";
import { loadRating, rate } from "../../actions";

class Ratings extends React.Component {
  componentWillMount() {
    const { game } = this.props;
    this.props.loadRating(game.id);
  }

  onStarClick = (e, { rating }) => {
    const { game } = this.props;
    this.props.rate(game, rating);
  };

  render() {
    const { rating, loadingRating } = this.props;
    if (!loadingRating) {
      return (
        <Rating
          clearable
          icon="star"
          size="large"
          className="stars"
          maxRating={10}
          rating={rating}
          onRate={this.onStarClick}
        />
      );
    } else {
      return null;
    }
  }
}

Rating.propTypes = {
  rating: PropTypes.number,
  loadingRating: PropTypes.bool,
  loadRating: PropTypes.func,
  rate: PropTypes.func
};

const mapStateToProps = state => ({
  rating: state.game.rating,
  loadRating: state.game.loadingRating
});

export default connect(
  mapStateToProps,
  { loadRating, rate }
)(Ratings);
