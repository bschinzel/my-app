import React from 'react';

export default class Navigation extends React.Component {
  render() {
    let octicons = require('octicons');

    return (
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapsible" aria-controls="navbar-collapsible" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-collapsible">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="#">Kalender</a>
            </li>
            <li className="nav-item">
              <a className="nav-item nav-link disabled" href="#">Mitarbeiter</a>
            </li>
            <li className="nav-item">
              <a className="nav-item nav-link disabled" href="#">Gruppen</a>
            </li>
            <li className="nav-item">
              <a className="nav-item nav-link disabled" href="#">Statistiken</a>
            </li>
            <li className="nav-item ml-lg-auto">
              <a className="nav-item nav-link disabled" href="#" dangerouslySetInnerHTML={{__html: octicons.person.toSVG() + ' Mein Profil'}} />
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
