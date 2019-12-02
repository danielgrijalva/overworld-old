import React, { useContext } from "react";
import { ReactReduxContext } from "react-redux";
import { Container } from "semantic-ui-react";
import Landing from "../landing/";

const App = () => {
  const { getState } = useContext(ReactReduxContext).store;
  const { auth } = getState();

  if (auth.isAuthenticated) {
    return (
      <Container>
        <h1>Welcome</h1>
      </Container>
    );
  } else if (auth.isLoading) {
    return null;
  } else {
    return <Landing />;
  }
};

export default App;
