import React from 'react';
import 'App.css';

import AppContainer from "containers/AppContainer";
import { Route, Switch, Redirect } from 'react-router-dom'
import { SearchContainer } from "containers/SearchContainer";
import { HomeContainer } from './containers/HomeContainer';
import { Splash } from 'containers/Splash'
import { Navigation } from "components/Navigation/navigation";
type AppProps = {

}

const App = (props: AppProps) => {
  return (
    <AppContainer>
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route exact path="/home" component={HomeContainer} />
        <Route exact path="/search" component={SearchContainer} />
        <Redirect to="/" />
      </Switch>
    </AppContainer>
  );
};

export default App;
