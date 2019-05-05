import React from "react";
import "./External.css";
import { Icon, List, Card } from "semantic-ui-react";

export const External = ({ game }) => (
  <section className="external">
    <Card className="external margin-top-sm">
      <Card.Header className="external header">External links</Card.Header>
      <Card.Content className="external content">
        {/* {game.platforms.map(p => {
          return <Label className="platform">{p.name}</Label>;
        })} */}
        <List divided relaxed>
          <List.Item>
            <List.Content
              as="a"
              href={`https://www.twitch.tv/directory/game/${game.name}`}
            >
              <Icon fitted name="twitch" size="large" />
              Watch on Twitch
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content
              as="a"
              href={`https://www.amazon.com/s?k=${game.name}`}
            >
              <Icon fitted name="amazon" size="large" />
              Buy on Amazon
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content as="a" href={game.site_detail_url}>
              <Icon fitted name="world" size="large" />
              Visit website
            </List.Content>
          </List.Item>
        </List>
      </Card.Content>
    </Card>
  </section>
);
