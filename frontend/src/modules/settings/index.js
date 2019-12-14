import React from "react";
import { Tab, Container } from "semantic-ui-react";
import { EditProfile } from "./components";

const Settings = () => {
    return (
      <Container>
        <Tab
          className="tabs margin-top"
          menu={{ secondary: true, pointing: true }}
          panes={[
            {
              menuItem: "profile",
              render: () => (
                <Tab.Pane attached={false}>
                  <EditProfile />
                </Tab.Pane>
              )
            },
            {
              menuItem: "connections",
              render: () => (
                <h1>
                  <span role="img" aria-label="construction">
                    🚧
                  </span>
                </h1>
              )
            }
          ]}
        />
      </Container>
    );
}

export default Settings;
