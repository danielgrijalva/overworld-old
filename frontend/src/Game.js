import React from 'react';
import { Container } from 'semantic-ui-react'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {}
        }
    }

    componentDidMount() {
        const game = this.props.location.state;
        if (game) {
            this.setState({ game: game })
        } else {
            // user entered the page directly
            // should fetch the game by reading the slug
            // and then calling the Search API
            console.log('fetching...')
        }
    }

    render() {
        const { game } = this.state;
        return (
            <Container>
                <p>{game.name}</p>
                <p>{game.summary}</p>
                <p>{game.cover}</p>
                <p>{game.first_release_date}</p>
                <p>{game.involved_companies}</p>
            </Container>
        )
    }
}

export default Game;