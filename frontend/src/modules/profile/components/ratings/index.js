import React from "react";
import "./styles.css"

class Ratings extends React.Component {
  constructor(props) {
    super(props);
    const { username=null, height = 100, width = 250 } = props;
    this.state = {
      username: username,
      data: null,
      height: height,
      width: width
    };
  }

  componentDidMount(){
    const data = [1,0,0,0,3,0,7,7, 3,5]; //hard coded test data
    const total = data.reduce((acum, current) => acum+current,0)

    let average = 0
    data.forEach((val,index) => {
        average += (val * (index+1))/total //scale to 10 point scale
    })
    average = Math.round(average*100) / 100 //round too two decimal places

    this.setState( {
      ...this.state,
      data: data,
      total: total,
      average: average
    });
  }

  render() {
    console.log(this.state)
    if (this.state.data) {
      return (
        <div className="rating">
        <span className="star">★</span>
        <div
          className="rating-chart"
          style={{ height: this.state.height, width: this.state.width }}
        >
          {this.state.data.map((val,i) => {
            const percent = val / this.state.total;
            return( <div className ="rating-bar" key={"rating" +i} style={{height: percent * (this.state.height-10) + 10, width: (this.state.width/this.state.data.length)}}></div>)
          })}
        </div>
        <div className="rating-label">
            <span className="rating-average">{this.state.average}</span><br/>
            <span className="star">★★★★★</span>
        </div>
        </div>

      );

    } else {
      return <h3>Loading</h3>;
    }
  }
}

export default Ratings;
