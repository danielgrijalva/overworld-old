import React from "react";
import {
  Container,
  Grid,
  Label,
  Icon,
  List,
  Tab
} from "semantic-ui-react";
import Actions from "./actions/Actions";
import axios from "axios";
import Moment from "react-moment";
import { LazyImage } from "react-lazy-images";
import Backdrop from "./Backdrop";
import { ImageLoader, TitleLoader, ListLoader } from "./Loaders";
import "./Game.css";
import { External } from "./external/External";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: "",
      game: {},
      screenshots: [],
      isLoading: true,
      isCoverLoading: true,
      cover: {}
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
      cover: {}
    });
  };

  loadGame = gameId => {
    axios.all([this.loadGameInfo(gameId), this.loadScreenshots(gameId)]).then(
      axios.spread((game, scr) => {
        this.setState({
          game: game.data.results,
          screenshots: scr.data.results,
          isLoading: false
        });
      })
    );
  };

  loadGameInfo = gameId => {
    return axios.get(`/api/games/${gameId}`);
  };

  loadScreenshots = gameId => {
    return axios.get(`/api/screenshots/${gameId}`);
  };

  createMarkup = html => {
    return { __html: html };
  };

  getPlatform = p => {
    switch (p) {
      case "PlayStation 4":
        return <Icon name="playstation" size="large" />;
      case "Xbox One":
        return <Icon name="xbox" size="large" />;
      case "PC":
        return <Icon name="windows" size="large" />;
      case "Mac":
        return <Icon name="apple" size="large" />;
      case "Linux":
        return <Icon name="linux" size="large" />;
      case "Nintendo Switch":
        return <Icon name="nintendo switch" size="large" />;
      case "Android":
        return <Icon name="android" size="large" />;
      default:
        return <Label className="platform">{p}</Label>;
    }
  };

  render() {
    const { game, screenshots, isLoading } = this.state;

    return (
      <Container>
        <Grid className="game" centered>
          {!isLoading && (
            <Backdrop
              placeholder={
                screenshots.length > 0
                  ? screenshots[0].thumb_url
                  : game.images[0].thumb_url
              }
              actual={
                screenshots.length > 0
                  ? screenshots[0].original_url
                  : game.images[0].original
              }
            />
          )}
          <Grid.Row className="game-content">
            <React.Fragment>
              <Grid.Column width={4}>
                {!isLoading ? (
                  <React.Fragment>
                    <LazyImage
                      src={game.image.small_url}
                      alt="Game cover."
                      placeholder={({ imageProps, ref }) => (
                        <img
                          {...imageProps}
                          ref={ref}
                          className="ui rounded image cover placeholder"
                          src={game.image.thumb_url}
                        />
                      )}
                      actual={({ imageProps }) => (
                        <img
                          className="ui rounded image cover"
                          {...imageProps}
                        />
                      )}
                    />
                    <section className="margin-top-xs quick-stats">
                      <List horizontal>
                        <List.Item>
                          <List.Content>
                            <Icon
                              size="small"
                              color="green"
                              name="circle check"
                            />
                            11.2k
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <Icon
                              size="small"
                              color="orange"
                              name="heart"
                            />
                            7.7k
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <Icon
                              size="small"
                              color="teal"
                              name="clock"
                            />
                            5k
                          </List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Content>
                            <Icon
                              size="small"
                              color="yellow"
                              name="shop"
                            />
                            6.1k
                          </List.Content>
                        </List.Item>
                      </List>
                    </section>
                    <External game={game} />
                  </React.Fragment>
                ) : (
                  <ImageLoader />
                )}
              </Grid.Column>
              <Grid.Column width={8}>
                {!isLoading ? (
                  <React.Fragment>
                    <section className="game-header margin-bottom-sm">
                      <React.Fragment>
                        <h1>{game.name}</h1>
                        <small className="release-date">
                          <a href="#">
                            <Moment format="YYYY">
                              {game.original_release_date}
                            </Moment>
                          </a>
                        </small>
                      </React.Fragment>
                    </section>
                    <section>
                      <span className="game-info margin-bottom-sm">
                        <small className="company">
                          A game by <a href="#">{game.developers[0].name}</a>
                        </small>
                      </span>
                      <span
                        style={{ textAlign: "justify" }}
                        dangerouslySetInnerHTML={this.createMarkup(game.deck)}
                      />
                      <Tab
                        className="tabs margin-top"
                        menu={{ secondary: true, pointing: true }}
                        panes={[
                          {
                            menuItem: "team",
                            render: () => (
                              <Tab.Pane attached={false}>
                                {game.people.map(p => (
                                  <Label className="platform">{p.name}</Label>
                                ))}
                              </Tab.Pane>
                            )
                          },
                          {
                            menuItem: "genres",
                            render: () => (
                              <Tab.Pane attached={false}>
                                {game.genres.map(g => (
                                  <Label className="platform">{g.name}</Label>
                                ))}
                              </Tab.Pane>
                            )
                          },
                          {
                            menuItem: "platforms",
                            render: () => (
                              <Tab.Pane attached={false}>
                                {game.platforms.map(p => (
                                  <Label className="platform">{p.name}</Label>
                                ))}
                              </Tab.Pane>
                            )
                          },
                          { menuItem: "details" }
                        ]}
                      />
                    </section>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <TitleLoader />
                    <ListLoader />
                  </React.Fragment>
                )}
              </Grid.Column>
              <Grid.Column width={4}>
                <Actions />
              </Grid.Column>
            </React.Fragment>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default Game;
