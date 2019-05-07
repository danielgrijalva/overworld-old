import React from "react";
import { Container, Button, Grid, Message, List } from "semantic-ui-react";
import Backdrop from "../game/components/backdrop/Backdrop";
import axios from "axios";
import "./Landing.css";

export default class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      backdrop: {},
      popular: {},
      popularCovers: [],
      isLoadingPopular: true
    };
  }

  componentWillMount() {
    this.getBackdrop();
    this.getPopular();
  }

  getBackdrop = () => {
    var options = [
      { name: "Nier:Automata", gameId: "3030-49998" },
      { name: "The Elder Scrolls IV: Oblivion", gameId: "3030-20238" },
      { name: "Marvel's Spider-Man", gameId: "3030-54233" },
      { name: "Fortnite", gameId: "3030-37030" },
      { name: "Nioh", gameId: "3030-27578" },
      { name: "The Last of Us", gameId: "3030-36989" },
      { name: "Uncharted 4: A Thief's End", gameId: "3030-44507" },
      { name: "Persona 5", gameId: "3030-30486" },
      { name: "Firewatch", gameId: "3030-45658" },
      { name: "Minecraft", gameId: "3030-30475" },
      { name: "Mario Kart 8", gameId: "3030-42929" },
      { name: "Castlevania: Symphony of the Night", gameId: "3030-14216" }
    ];
    const game = options[Math.floor(Math.random() * options.length)];

    this.loadBackdrop(game);
  };

  loadBackdrop = game => {
    axios.get(`/api/screenshots/${game.gameId}`).then(response => {
      const backdrop = response.data.results[0];
      this.setState({
        backdrop: {
          ...this.state.backdrop,
          plcaeholder: backdrop.thumb_url,
          actual: backdrop.original_url,
          name: game.name,
          gameId: game.gameId
        }
      });
    });
  };

  getPopular = () => {
    axios.get("/api/popular/").then(response => {
      this.setState({ popular: response.data });
      this.getPopularCovers();
    });
  };

  getPopularCovers = () => {
    var games = this.state.popular.map(p => `/api/igdb/cover/${p.cover}`);
    axios.all(games.map(l => axios.get(l))).then(
      axios.spread((...res) => {
        const covers = res.map(c => c.data[0].image_id);
        const { popular } = this.state;
        covers.map((c, i) => {
          popular[i].image_id = c;
        });
        this.setState({
          popular: popular,
          isLoadingPopular: false
        });
      })
    );
  };

  render() {
    const { backdrop, popular, isLoadingPopular } = this.state;
    return (
      <React.Fragment>
        <Container className="padding-bottom">
          {backdrop && (
            <Backdrop
              actual={backdrop.actual}
              placeholder={backdrop.placeholder}
            />
          )}
          <div className="landing">
            <section className="landing-header">
              <h1>The social network for video game lovers.</h1>
              <p>
                Start your gaming journal now, it's free!
                <Button color="green" style={{ margin: "0 1rem" }}>
                  Get Started
                </Button>
                Or <a href="/">sign in</a> if you're already a member.
              </p>
            </section>
            <section className="popular margin-top-sm margin-bottom">
              {!isLoadingPopular ? (
                <React.Fragment>
                  {popular.map(p => {
                    return (
                      <div className="cover-wrapper">
                        <img
                          key={p}
                          className="cover"
                          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${
                            p.image_id
                          }.jpg`}
                        />
                        <div className="cover-overlay">
                          <strong>{p.name}</strong>
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {[...Array(6)].map(i => (
                    <div key={i} className="placeholder" />
                  ))}
                </React.Fragment>
              )}
            </section>
            <section className="features">
              <Grid centered>
                <p style={{ textTransform: "uppercase" }}>Features...</p>
                <Grid.Row width={12}>
                  <Grid.Column width={4}>
                    <Message
                      className="track"
                      icon="gamepad"
                      content="Keep track of every game you've played or want to play."
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Message
                      className="like"
                      icon="heart"
                      content="Show some love for your favorite games, lists and reviews."
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Message
                      className="reviews"
                      icon="book"
                      content="Write and share reviews, and follow other members to read theirs."
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row width={12}>
                  <Grid.Column width={4}>
                    <Message
                      className="rate"
                      icon="star"
                      content="Rate games in a ten-star scale to record and share your reaction."
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Message
                      className="lists"
                      icon="list alternate"
                      content="Create and share lists of games and keep a wishlist of games."
                    />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Message
                      className="journal"
                      icon="calendar"
                      content="Keep a journal of what you have played along the year."
                    />
                  </Grid.Column>
                </Grid.Row>
                <p className="backdrop-name margin-top">
                  Still from{" "}
                  <a href={`/games/${backdrop.gameId}`}>{backdrop.name}</a>
                </p>
              </Grid>
            </section>
          </div>
        </Container>
        <footer className="margin-top-sm">
          <Container>
            <List horizontal>
              <List.Item as="a">About</List.Item>
              <List.Item as="a">Help</List.Item>
              <List.Item as="a">Feedback</List.Item>
              <List.Item as="a">Contact</List.Item>
            </List>
            <p className="landing info margin-top-xs">
              © App. Made with ❤ in Planet Earth. Data from{" "}
              <a href="https://www.giantbomb.com/api/">Giant Bomb</a> &{" "}
              <a href="https://api.igdb.com">IGDB</a>.
            </p>
          </Container>
        </footer>
      </React.Fragment>
    );
  }
}
