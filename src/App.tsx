import React from 'react';
import 'App.css';

import AppContainer from 'containers/AppContainer';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MapContainer } from 'containers/MapContainer';
import { HomeContainer } from './containers/HomeContainer';
import { Splash } from 'containers/Splash';
type AppProps = {};
const App = (props: AppProps) => {
  return (
    <AppContainer>
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route exact path="/discounts" component={MapContainer} />
        <Route exact path="/home" component={HomeContainer} />
        <Redirect to="/" />
      </Switch>
    </AppContainer>
  );
};

export default App;
