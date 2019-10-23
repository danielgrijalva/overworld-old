import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadRating, rate } from "../../actions";
import Rating from "react-rating";
import "font-awesome/css/font-awesome.min.css";

class Ratings extends React.Component {
  componentWillMount() {
    const { game } = this.props;
    this.props.loadRating(game.id);
  }

  onStarClick = rate => {
    const { game } = this.props;
    if (this.props.rating === rate) {
      this.props.rate(game, 0);
    } else {
      this.props.rate(game, rate);
    }
  };

  onChange = rate => {
    const { game } = this.props;
    this.setState({ rate: rate });
    this.props.rate(game, rate);
  };

  render() {
    const { rating, loadingRating } = this.props;
    if (!loadingRating) {
      return (
        <Rating
          start={0}
          stop={5}
          className="stars"
          emptySymbol="fa fa-star fa-2x"
          fullSymbol="fa fa-star fa-2x"
          fractions={2}
          onClick={this.onStarClick}
          initialRating={rating}
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
