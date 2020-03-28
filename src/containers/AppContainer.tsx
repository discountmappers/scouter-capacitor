import React from "react";
import { Navigation } from "components/Navigation/navigation";
import { Container } from "@material-ui/core";


type AppProps = {
  children: React.ReactNode;
};

const AppContainer = (props: AppProps) => {
  // add app theme
  return (
    <>
      <Container maxWidth="xl">
        <Navigation />
        {props.children}
      </Container>
    </>

  );
};

export default AppContainer
