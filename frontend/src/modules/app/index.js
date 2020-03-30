import React from "react";
import { useSelector } from "react-redux";
import Landing from "../landing/";
import { Frontpage } from "../frontpage";
const App = () => {
  const auth = useSelector(state => state.auth);

  if (auth.isAuthenticated) {
    return <Frontpage />;
  } else if (auth.isLoading) {
    return null;
  } else {
    return <Landing />;
  }
};

export default App;
