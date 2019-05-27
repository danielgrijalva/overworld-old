import React from "react";
import { Container, List } from "semantic-ui-react";
import "./Footer.css";

export const Footer = () => (
  <footer>
    <Container>
      <List horizontal>
        <List.Item as="a">About</List.Item>
        <List.Item as="a">Help</List.Item>
        <List.Item as="a">Feedback</List.Item>
        <List.Item as="a">Contact</List.Item>
      </List>
      <p className="landing info margin-top-xs">
        Made with ❤ in Planet Earth. Data from{" "}
        <a href="https://api.igdb.com">IGDB</a>.
      </p>
    </Container>
  </footer>
);
