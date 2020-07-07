import React from "react";
import { Grid, Container } from "semantic-ui-react";
import { RegistrationForm } from "./Form";
import UseBackdrop from "../../hooks/useBackdrop";
import "./styles.scss";

const SignUpPage = () => {

  const options = { position: ['isBackground'] };
  const { Backdrop } = UseBackdrop(options);

  return (
    <>
      <Backdrop>
        <Grid centered stackable>
          <Grid.Row style={{ marginBottom: "30px" }}>
            <h1>Start your gaming journal now, it's free!</h1>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <Container>
                <RegistrationForm />
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Backdrop>
    </>
  );
};

export default SignUpPage;
