import React from "react";
import "./styles.css"
import {loadRatings} from '../../actions'
import { connect } from "react-redux";

class Ratings extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      total: 0,
      average: 0
    }
  }

  componentWillMount(){
    this.props.loadRatings(this.props.user_id)

  }

  processRatings = (data) => {
    const chartData = Array(10).fill(0)
    const total_length = data.length
    let total_val = 0
    data.forEach(val => {
      chartData[val.rating -1] +=1
      total_val += val.rating
    })

    const average = Math.round((total_val/total_length)*100)/100 //round to two decimal
    
    return {chartData: chartData, average: average, total: total_length}
  }

  render() {
    if (this.props.ratings.length > 0) {
      const {chartData, average, total} = this.processRatings(this.props.ratings)
      return (
        <div className="rating">
        <span className="star">★</span>
        <div
          className="rating-chart"
          style={{ height: this.props.height, width: this.props.width }}
        >
          {chartData.map((val,i) => {
            const percent = total ? val / total : 0; //calculate percent if total is non zero 
            return( <div className ="rating-bar" key={"rating" +i} style={{height: percent * (this.props.height-10) + 10, width: (this.props.width/chartData.length)}}></div>)
          })}
        </div>
        <div className="rating-label">
            <span className="rating-average">{average}</span><br/>
            <span className="star">★★★★★</span>
        </div>
        </div>

      );

    } else {
      return <h3>Loading</h3>;
    }
  }
}

const mapStateToProps = state => ({
  ratings: state.profile.ratings
});

export default connect(
  mapStateToProps,
  { loadRatings }
)(Ratings);

