import React from "react";
import { Button } from "semantic-ui-react";
import './Headline.css'

export const Headline = () => (
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
);
