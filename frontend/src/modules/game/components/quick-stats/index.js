import React from "react";
import { List, Icon } from "semantic-ui-react";
import "./styles.css";

const QuickStats = () => {
  return (
    <section className="margin-top-xs quick-stats">
      <List horizontal>
        <List.Item as="a">
          <List.Content>
            <Icon size="small" color="green" name="circle check" />
            11.2k
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Icon size="small" color="orange" name="heart" />
            7.7k
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Icon size="small" color="teal" name="clock" />
            5k
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Icon size="small" color="yellow" name="shop" />
            6.1k
          </List.Content>
        </List.Item>
      </List>
    </section>
  );
};

export default QuickStats;
