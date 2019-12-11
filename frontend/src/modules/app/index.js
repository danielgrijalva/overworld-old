import React from "react";
import { useSelector } from "react-redux";
import { Container } from "semantic-ui-react";
import Landing from "../landing/";

const App = () => {
  const auth = useSelector(state => state.auth);

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
