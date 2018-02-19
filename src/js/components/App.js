import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navigation from './Navigation.js';
import Kalender from './Kalender.js';
import Login from './Login.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false
    }
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (<Login />);
    } else {
      return (
        <div>
          <Navigation />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Kalender} />
              <Route path="/kalender" component={Kalender} />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
  }
}
