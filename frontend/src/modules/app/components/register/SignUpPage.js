import React, { useEffect } from "react";
import { Grid, Container } from "semantic-ui-react";
import { RegistrationForm } from "./Form";
import { LoginForm } from "../login/Form";
import { Link } from "react-router-dom";
import { Backdrop, Footer } from "../";
import { getBackdrop } from "../../../landing/actions";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { Backdrops as options } from "../../../landing/utils";

const SignUpPage = () => {
  const { backdrop } = useSelector(state => state.landing);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(backdrop).length === 0) {
      const game = options[Math.floor(Math.random() * options.length)];
      dispatch(getBackdrop(game.gameId));
    }
  });

  return (
    <>
      {Object.keys(backdrop).length > 0 && (
        <Backdrop imageId={backdrop.imageId} />
      )}

      <Grid centered stackable>
        <Grid.Row>
          <h1>Start your gaming journal now, it's free!</h1>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Container>
              {/* <h1>Join Overworld</h1> */}
              {/* <RegistrationForm /> */}
              {/* <h1>Welcome Back</h1> */}
              <LoginForm />
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {Object.keys(backdrop).length > 0 && (
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
      )}
      <Footer />
    </>
  );
};

export default SignUpPage;
