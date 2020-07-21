import React from "react";
import { Grid, Container } from "semantic-ui-react";
import { LoginForm } from "./Form";
import UseBackdrop from "../../hooks/useBackdrop";
import "./styles.scss";

const SignInPage = () => {
  const options = { position: ["isLeft"] };
  const { Backdrop } = UseBackdrop(options);

  return (
    <>
      <Backdrop>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column
              floated="right"
              width={4}
              style={{ marginRight: "50px" }}
            >
              <Container>
                <h1 style={{ marginBottom: "30px", textAlign: "center" }}>Welcome Back</h1>
                <LoginForm />
              </Container>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginBottom: "10px" }}></Grid.Row>
        </Grid>
      </Backdrop>
    </>
  );
};

export default SignInPage;
