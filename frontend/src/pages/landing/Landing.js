import React from "react";
import { Container } from "semantic-ui-react";
import Backdrop from "../game/components/backdrop/Backdrop";
import { Footer } from "../app/components/footer/Footer";
import { Features } from "./components/features/Features";
import { Popular } from "./components/popular/Popular";
import { Backdrops as options } from "./Backdrops";
import { Headline } from "./components/headline/Headline";
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
    const game = options[Math.floor(Math.random() * options.length)];

    this.loadBackdrop(game);
  };

  loadBackdrop = game => {
    axios.get(`/api/screenshots/${game.gameId}`).then(response => {
      const backdrop = response.data.results[0];
      this.setState({
        backdrop: {
          ...this.state.backdrop,
          placeholder: backdrop.thumb_url,
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
          {Object.keys(backdrop).length > 0 && (
            <Backdrop
              actual={backdrop.actual}
              placeholder={backdrop.placeholder}
            />
          )}
          <div className="landing">
            <Headline />
            <Popular isLoading={isLoadingPopular} popular={popular} />
            <Features />
            <section className="backdrop-name">
              Backdrop from{" "}
              <a href={`/games/${backdrop.gameId}`}>{backdrop.name}</a>
            </section>
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}
