import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { Register, LogIn } from "../app/components/";
import { getPopular } from "./actions";
import { Features, Popular } from "./components/";
import UseBackdrop from "../app/hooks/useBackdrop";
import "./styles.scss";

const Landing = (props) => {
  const dispatch = useDispatch();
  const { isLoadingPopular, popular } = useSelector(state => state.landing);
  const { Backdrop } = UseBackdrop();

  useEffect(() => {
    if (popular.length === 0) {
      dispatch(getPopular());
    }
  }, [popular]);

  return (
    <>
      <Backdrop>
        <Container>
          <div className="landing">
            <section className="landing-header">
              <h1>The social network for video game lovers.</h1>
              <p>
                Start your gaming journal now, it's free!
                <Register />
                Or <LogIn loginText="sign in" /> if you're already a member.
              </p>
            </section>
            <Popular isLoading={isLoadingPopular} popular={popular} />
            <Features />
          </div>
        </Container>
      </Backdrop>
    </>
  );
};

export default Landing;
