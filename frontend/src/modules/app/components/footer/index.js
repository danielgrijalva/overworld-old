import React from "react";
import { Container, List } from "semantic-ui-react";
import "./styles.css";

const Footer = () => (
  <footer>
    <Container>
      <List horizontal>
        <List.Item as="a" href="https://overworld.gitbook.io/docs/">
          About
        </List.Item>
        <List.Item
          as="a"
          href="https://overworld.gitbook.io/docs/community/get-in-touch"
        >
          Feedback
        </List.Item>
        <List.Item as="a" href="https://github.com/danielgrijalva/overworld">
          Open Source
        </List.Item>
      </List>
      <p className="landing info margin-top-xs">
        Made with ❤ in Planet Earth. Data from{" "}
        <a href="https://api.igdb.com">IGDB</a>.
      </p>
    </Container>
  </footer>
);

export default Footer;
