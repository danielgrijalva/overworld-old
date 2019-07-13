import React from "react";
import PropTypes from "prop-types";
import { Tab, Grid, Label } from "semantic-ui-react";
import countries from "i18n-iso-countries";
import Moment from "react-moment";
import "./styles.css";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const Details = ({ game }) => {
  return (
    <Tab
      className="tabs margin-top"
      menu={{ secondary: true, pointing: true }}
      panes={[
        {
          menuItem: "details",
          render: () => (
            <Tab.Pane className="details" attached={false}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <h3>
                      <span>Country</span>
                    </h3>
                  </Grid.Column>
                  <Grid.Column width={8} className="details">
                    <Label>
                      {countries.getName(
                        game.involved_companies[0].company.country,
                        "en"
                      )}
                      {console.log(game)}
                    </Label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <h3>
                      <span>Release Date</span>
                    </h3>
                  </Grid.Column>
                  <Grid.Column width={8} className="details">
                    <Label>
                      <Moment format="MMMM DD YYYY">
                        {game.first_release_date * 1000}
                      </Moment>
                    </Label>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <h3>
                      <span>Developers</span>
                    </h3>
                  </Grid.Column>
                  <Grid.Column width={8} className="details">
                    {game.involved_companies.map(d => {
                      return (
                        d.developer && (
                          <Label key={d.id}>{d.company.name}</Label>
                        )
                      );
                    })}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <h3>
                      <span>Publishers</span>
                    </h3>
                  </Grid.Column>
                  <Grid.Column width={8} className="details">
                    {game.involved_companies.map(d => {
                      return (
                        d.publisher && (
                          <Label key={d.id}>{d.company.name}</Label>
                        )
                      );
                    })}
                  </Grid.Column>
                </Grid.Row>
                {game.time_to_beat && (
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <h3>
                        <span>Time to beat</span>
                      </h3>
                    </Grid.Column>
                    <Grid.Column width={8} className="details">
                      <Label>
                        {Math.floor(game.time_to_beat.normally / 3600)} hours
                      </Label>
                    </Grid.Column>
                  </Grid.Row>
                )}
              </Grid>
            </Tab.Pane>
          )
        },
        {
          menuItem: "platforms",
          render: () => (
            <Tab.Pane attached={false}>
              {game.platforms.map(p => {
                return <Label key={p.id}>{p.name}</Label>;
              })}
            </Tab.Pane>
          )
        },
        {
          menuItem: "genres",
          render: () => (
            <Tab.Pane attached={false}>
              {game.genres.map(g => {
                return <Label key={g.id}>{g.name}</Label>;
              })}
              {game.themes.map(t => {
                return <Label key={t.id}>{t.name}</Label>;
              })}
            </Tab.Pane>
          )
        }
      ]}
    />
  );
};

Details.propTypes = {
  game: PropTypes.object.isRequired
};

export default Details;
