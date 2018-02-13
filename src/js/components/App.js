import React from 'react';
import Kalender from './Kalender.js';
import Navigation from './Navigation.js';

const App = function(props) {
    return (
      <div>
        <Navigation />
        <Kalender />
      </div>
    );
}

export default App;
