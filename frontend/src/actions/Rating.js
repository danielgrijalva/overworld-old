import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Icon } from 'semantic-ui-react';

export default class Rating extends React.Component {
    constructor() {
        super();
        this.state = {
            rating: 0,
            rating_half_star: 0,
        }
    }

    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ rating: nextValue });
    }

    onStarClickHalfStar = (nextValue, prevValue, name, e) => {
        const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

        if (xPos <= 0.5) {
            nextValue -= 0.5;
        }

        this.setState({ rating_half_star: nextValue });
    }

    render() {
        return (
            <div className="stars">
                <StarRatingComponent
                    name="game-rating"
                    starColor="#ffb400"
                    emptyStarColor="#334556"
                    value={this.state.rating_half_star}
                    onStarClick={this.onStarClickHalfStar.bind(this)}
                    renderStarIcon={(index, value) => {
                        return (
                            <span>
                                <Icon fitted color={index <= value ? "yellow" : ""} name={index <= value ? 'star' : 'star'} />
                            </span>
                        );
                    }}
                    renderStarIconHalf={() => {
                        return (
                            <span>
                                <span style={{ position: 'absolute' }}><Icon fitted name="star half " /></span>
                                <span>
                                    <Icon.Group>
                                        <Icon style={{ transform: 'scale(-1,1)' }} fitted flipped="horizontally" name="star half" />
                                        <Icon fitted color="yellow" name="star half" />
                                    </Icon.Group>
                                </span>
                            </span>
                        );
                    }} />
            </div>
        )
    }

}