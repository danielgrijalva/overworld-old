import React from "react";
import { Icon } from "semantic-ui-react";
import Rating from "react-rating";

export default class Ratings extends React.Component {
  constructor() {
    super();
    this.state = {
      rating: 0,
      rating_half_star: 0
    };
  }

  onStarClick = (nextValue, prevValue, name) => {
    this.setState({ rating: nextValue });
  };

  onStarClickHalfStar = (nextValue, prevValue, name, e) => {
    const xPos =
      (e.pageX - e.currentTarget.getBoundingClientRect().left) /
      e.currentTarget.offsetWidth;

    if (xPos <= 0.5) {
      nextValue -= 0.5;
    }

    this.setState({ rating_half_star: nextValue });
  };

  onStarHover = (nextValue, prevValue, name) => {
    console.log(nextValue, prevValue, name);
  };

  render() {
    return (
      <Rating
        className="stars"
        emptySymbol={<Icon className="half-star" name="star" />}
        fullSymbol={[<Icon color="yellow" name="star" />]}
        stop={10}
      />
    );
  }
}
