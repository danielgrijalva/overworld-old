import React from "react";
import { Container, Grid, Image, Loader, Menu, Icon } from "semantic-ui-react";

import axios from "axios";
import Moment from "react-moment";
import './Game.css'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: '',
      game: {},
      isLoading: true,
      isCoverLoading: true,
      isCompanyLoading: true,
      cover: {},
      company: ''
    };
  }

  componentWillReceiveProps(props) {
    if (props.location.state !== this.state.gameId) {
      const gameId = props.location.state;
      this.resetState(gameId);
      this.loadGame(gameId);
    }
  }

  componentWillMount() {
    const gameId = this.props.location.state;
    this.resetState(gameId);

    this.loadGame(gameId);
  }

  resetState = gameId => {
    this.setState({
      gameId: gameId,
      game: {},
      isLoading: true,
      isCoverLoading: true,
      isCompanyLoading: true,
      cover: {},
      company: ''
    })
  }

  loadGame = gameId => {
    axios.get(`/api/games/${gameId}`)
      .then(response => {
        const game = response.data[0];
        this.setState({ isLoading: false, game: game })
        this.getGameData(game)
      })
  }

  getGameData = game => {
    axios.all([this.getCover(game.cover), this.getDeveloper(game.id)])
      .then(axios.spread((cover, company) => {
        this.setState({
          isCompanyLoading: false,
          isCoverLoading: false,
          cover: {
            cover: cover.data[0].image_id,
            width: cover.data[0].width,
            height: cover.data[0].height,
          },
          company: company.data[0]
        })
      }))
  }

  getCover = id => {
    return axios.get(`/api/covers/${id}`)
  }


  getDeveloper = gameId => {
    return axios.get(`/api/developers/${gameId}`)
  }

  render() {
    const {
      game,
      isLoading,
      isCoverLoading,
      isCompanyLoading,
      cover,
      company } = this.state;

    if (isLoading) {
      return <p>loading</p>
    }

    return (
      <Container>
        <Grid verticalAlign={!isCoverLoading ? 'top' : 'middle'} centered>
          <Grid.Row>
            <Grid.Column width={4}>
              {!isCoverLoading ?
                <Image
                  rounded
                  className="cover frame"
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.cover}.jpg`}
                />

                :
                <Loader active inline="centered" size="medium" />
              }
            </Grid.Column>
            <Grid.Column width={8}>
              <section className="game-header margin-bottom-sm">
                <h1>{game.name}</h1>
                <small className="release-date">
                  <a href="#"><Moment unix format="YYYY">
                    {game.first_release_date}
                  </Moment></a>
                </small>

              </section>
              <section className="game-info margin-bottom-sm">
                {!isCompanyLoading ?
                  <small className="company">A game by&nbsp;

                    <a href="#">{company.name}</a>
                  </small>

                  :
                  null
                }
              </section>
              <section>
                <p>{game.summary}</p>
              </section>
            </Grid.Column>
            <Grid.Column width={4}>
                n
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Game;
