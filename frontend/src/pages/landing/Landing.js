import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPopular, getBackdrop } from "../../actions/landing";
import { Footer } from "../app/components/footer/Footer";
import { Features } from "./components/features/Features";
import { Headline } from "./components/headline/Headline";
import { Popular } from "./components/popular/Popular";
import { Backdrops as options } from "./Backdrops";
import Backdrop from "../game/components/backdrop/Backdrop";
import "./Landing.css";

class Landing extends React.Component {
  componentDidMount() {
    const game = options[Math.floor(Math.random() * options.length)];
    if (Object.keys(this.props.backdrop).length === 0) {
      this.props.getBackdrop(game.gameId);
    }

    if (this.props.popular.length === 0) {
      this.props.getPopular();
    }
  }

  render() {
    const { isLoadingPopular, popular, backdrop } = this.props;
    return (
      <React.Fragment>
        <Container className="padding-bottom">
          {Object.keys(backdrop).length > 0 && (
            <Backdrop imageId={backdrop.imageId} />
          )}
          <div className="landing">
            <Headline />
            <Popular isLoading={isLoadingPopular} popular={popular} />
            <Features />
            <section className="backdrop-name">
              Backdrop from{" "}
              <Link
                to={{
                  pathname: `/games/${backdrop.slug}`,
                  state: backdrop.gameId
                }}
              >
                {backdrop.name}
              </Link>
            </section>
          </div>
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  backdrop: state.landing.backdrop,
  isLoadingPopular: state.landing.isLoadingPopular,
  popular: state.landing.popular
});

export default connect(
  mapStateToProps,
  { getPopular, getBackdrop }
)(Landing);
