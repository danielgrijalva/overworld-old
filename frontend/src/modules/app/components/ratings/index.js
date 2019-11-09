import React from "react";
import { Divider, Popup } from "semantic-ui-react";
import "./styles.css";

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      average: 0
    };
  }

  processRatings = data => {
    let chartData = {
      "0.5": 0,
      "1.0": 0,
      "1.5": 0,
      "2.0": 0,
      "2.5": 0,
      "3.0": 0,
      "3.5": 0,
      "4.0": 0,
      "4.5": 0,
      "5.0": 0
    };
    const total_length = data.length;
    let total_val = 0;
    data.forEach(val => {
      chartData[val.rating] += 1;
      total_val += parseFloat(val.rating);
    });
    const average = total_val / total_length;
    return { chartData: chartData, average: average, total: total_length };
  };

  stringifyStars = value => {
    let stars = "★".repeat(value);
    if (value % 1) {
      stars += "½";
    }
    return stars;
  };

  render() {
    if (this.props.ratings.length > 0) {
      const { chartData, average, total } = this.processRatings(
        this.props.ratings
      );
      return (
        <React.Fragment>
          <Divider horizontal>Ratings</Divider>
          <div className="rating">
            <span className="rating-label">
              <span className="star">★</span>
            </span>
            <div className="rating-chart">
              {Object.keys(chartData).map((key, i) => {
                const height = total ? (chartData[key] * 100) / total : 0;
                return (
                  <Popup
                    key={i}
                    content={`${chartData[key]} ${this.stringifyStars(
                      key
                    )} ratings`}
                    position="top center"
                    size="tiny"
                    inverted
                    trigger={
                      <div
                        className="rating-bar"
                        key={"rating" + i}
                        style={{
                          height: height + 1
                        }}
                      />
                    }
                  />
                );
              })}
            </div>
            <div className="rating-label">
              {this.props.showAverage && (
                <span className="rating-average">{average.toFixed(1)}</span>
              )}
              <span className="star">★★★★★</span>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}

export default Ratings;
