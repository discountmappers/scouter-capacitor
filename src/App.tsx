import React from "react";
import "App.css";

import AppContainer from "containers/AppContainer";
import { Route, Switch, Redirect } from 'react-router-dom'
import { MapContainer } from "containers/MapContainer";
import { Splash } from 'containers/Splash'
import { Navigation } from "components/Navigation/navigation";
type AppProps = {

}
const App = (props: AppProps) => {

  return (
    <AppContainer>
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route exact path="/discounts" component={MapContainer} />
        <Redirect to="/" />
      </Switch>
    </AppContainer>
  );
};


export default App
