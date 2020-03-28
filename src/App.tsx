import React from 'react';
import 'App.css';

import AppContainer from 'containers/AppContainer';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MapContainer } from 'containers/MapContainer';
import { HomeContainer } from './containers/HomeContainer';
import { SearchContainer } from './containers/SearchContainer';

import { Splash } from 'containers/Splash';
type AppProps = {};
const App = (props: AppProps) => {
  return (
    <AppContainer>
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route exact path="/deals" component={MapContainer} />
        <Route exact path="/home" component={HomeContainer} />
        <Route exact path="/search" component={SearchContainer} />
        <Redirect to="/" />
      </Switch>
    </AppContainer>
  );
};

export default App;
