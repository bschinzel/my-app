import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navigation from './Navigation.js';
import Kalender from './Kalender.js';
import Login from './Login.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: null
    }
  }

  onLogin(user) {
    this.setState({isLoggedIn: true, user: user});
  }

  render() {
    if (!this.state.isLoggedIn) {
      return (<Login onLogin={(user) => this.onLogin(user)} />);
    } else {
      return (
        <div>
          <Navigation userName={this.state.user.name} />
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
