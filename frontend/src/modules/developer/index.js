import React, { useState, useEffect } from "react";
import { Container, Grid, GridRow, GridColumn } from "semantic-ui-react";
import axios from "axios";
import { Footer } from "../app/components";
import { CompanyDetails, CompanyGames } from "./components";

export const Developer = props => {
  const [games, setGames] = useState({});
  const [company, setCompany] = useState({});

  useEffect(() => {
    axios.get("/api/games/company/" + props.match.params.creator).then(res => {
      setCompany(res.data.company[0]);
      setGames(res.data.games);
    });
  }, []);

  return (
    <>
      <Container style={{ minHeight: "70vh" }}>
        <Grid stackable style={{ marginTop: "60px" }}>
          <GridRow>
            <GridColumn width={5} style={{ display: "inline-table" }}>
              <CompanyDetails company={company} />
            </GridColumn>
            <GridColumn width={11}>
              <CompanyGames company={company} games={games} />
            </GridColumn>
          </GridRow>
        </Grid>
      </Container>
      <Footer/>
    </>
  );
};
