import React from "react";
import { Container, Button } from "semantic-ui-react";
import Backdrop from "../game/components/backdrop/Backdrop";
import axios from "axios";
import "./Landing.css";

export default class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      backdropPlaceholder: null,
      backdrop: null,
      popular: {},
      popularCovers: [],
      isLoadingPopular: true
    };
  }

  componentWillMount() {
    // this.getBackdrop();
    this.getPopular();
  }

  getBackdrop = () => {
    var options = [
      "3030-49998",
      "3030-20238",
      "3030-54233",
      "3030-37030",
      "3030-27578",
      "3030-45658"
    ];
    var game = options[Math.floor(Math.random() * options.length)];

    this.loadBackdrop(game);
  };

  loadBackdrop = gameId => {
    axios.get(`/api/screenshots/${gameId}`).then(response => {
      const backdrop = response.data.results[0];
      this.setState({
        backdropPlaceholder: backdrop.thumb_url,
        backdrop: backdrop.original_url
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
        console.log(covers);
        this.setState({ popularCovers: covers, isLoadingPopular: false });
      })
    );
  };

  render() {
    const {
      backdrop,
      backdropPlaceholder,
      popular,
      popularCovers,
      isLoadingPopular
    } = this.state;
    return (
      <Container>
        {backdrop && (
          <Backdrop actual={backdrop} placeholder={backdropPlaceholder} />
        )}
        <div className="landing">
          <section className="landing-header">
            {/* <h1>The social network for video game lovers.</h1> */}
            <h1>This is the header</h1>
            <p>
              Start your gaming diary now, it's free!
              <Button color="green" style={{ margin: "0 1rem" }}>
                Get Started
              </Button>
              Or <a href="/">sign in</a> if you're already a member.
            </p>
          </section>
          <section className="popular margin-top-sm margin-bottom">
            {!isLoadingPopular ? (
              <React.Fragment>
                {popularCovers.map(p => {
                  return (
                    <img
                      src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${p}.jpg`}
                      className="image"
                    />
                  );
                })}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {[...Array(8)].map(i => (
                  <div className="placeholder image" />
                ))}
              </React.Fragment>
            )}
          </section>
        </div>
      </Container>
    );
  }
}
