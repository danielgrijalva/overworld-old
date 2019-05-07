import React from "react";
import { Grid, Message } from "semantic-ui-react";
import "./Features.css";

const columnProps = { mobile: 12, computer: 4 };

export const Features = () => (
  <section className="features">
    <Grid centered>
      <p style={{ textTransform: "uppercase" }}>Features...</p>
      <Grid.Row width={12}>
        <Grid.Column {...columnProps}>
          <Message
            className="track"
            icon="gamepad"
            content="Keep track of every game you've played or want to play."
          />
        </Grid.Column>
        <Grid.Column {...columnProps}>
          <Message
            className="like"
            icon="heart"
            content="Show some love for your favorite games, lists and reviews."
          />
        </Grid.Column>
        <Grid.Column {...columnProps}>
          <Message
            className="reviews"
            icon="book"
            content="Write and share reviews, and follow other members to read theirs."
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row width={12}>
        <Grid.Column {...columnProps}>
          <Message
            className="rate"
            icon="star"
            content="Rate games in a ten-star scale to record and share your reaction."
          />
        </Grid.Column>
        <Grid.Column {...columnProps}>
          <Message
            className="lists"
            icon="list alternate"
            content="Create and share lists of games and keep a wishlist of games."
          />
        </Grid.Column>
        <Grid.Column {...columnProps}>
          <Message
            className="journal"
            icon="calendar"
            content="Keep a gaming journal to record what you've played along the year."
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </section>
);
