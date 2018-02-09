import 'bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/app.css';
import '../css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
