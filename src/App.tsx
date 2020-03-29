import React from 'react';
import 'App.css';

import AppContainer from "containers/AppContainer";
import { Route, Switch, Redirect } from 'react-router-dom'
import { SearchContainer } from "containers/SearchContainer";
import { HomeContainer } from './containers/HomeContainer';
import { Splash } from 'containers/Splash'
import { DealsContainer } from 'containers/DealsContainer';
import { ProfileContainer } from 'containers/ProfileContainer';

type AppProps = {

}

const App = (props: AppProps) => {
  return (
    <AppContainer>
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route exact path="/home" component={HomeContainer} />
        <Route exact path="/search" component={SearchContainer} />
        <Route exact path="/deals" component={DealsContainer} />
        <Route exact path="/profile" component={ProfileContainer} />
        <Redirect to="/" />
      </Switch>
    </AppContainer>
  );
};

export default App;
