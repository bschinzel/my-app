import React from 'react';
import $ from 'jquery';
import Message from './Message.js';
import { SERVICE_ORGANISATION, XHR_ERROR_NO_CONNECTION, XHR_ERROR_404, XHR_ERROR_500, XHR_ERROR_UNKNOWN } from '../constants.js';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      email: "",
      passwort: ""
    }
  }

  handleChangeEMail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePasswort(event) {
    this.setState({passwort: event.target.value});
  }

  handleSubmit(event) {

    $.ajax({
      dataType: 'json',
      method: 'GET',
      headers: {
        'X-Username': this.state.email,
        'X-Password': this.state.passwort
      },
      url: SERVICE_ORGANISATION + "mitarbeiter/login",
      cache: false
    }).then((data) => {
      console.log(data);
    }, (jqXHR, exception) => {
      let errorMessage = null;

      if (jqXHR.status === 0) {
        errorMessage = XHR_ERROR_NO_CONNECTION;
      } else if (jqXHR.status === 404) {
        errorMessage = "Falches Passwort oder EMail Adresse";
      } else if (jqXHR.status === 500) {
        errorMessage = XHR_ERROR_500;
      } else {
        errorMessage = XHR_ERROR_UNKNOWN + ". Status Code: " + jqXHR.status + ", Meldung: " + exception;
      }

      console.error(errorMessage);

      this.setState({
        errorMessage: errorMessage
      });
    });

    event.preventDefault();
  }

  render() {
    let message = null;

    if (this.state.errorMessage != null) {
      message = (<Message severity="danger" value={this.state.errorMessage} />);
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-2" />
          <form
            className="p-3 col-12 col-md-5"
            onSubmit={(event) => this.handleSubmit(event)}>
            {message}
            <div className="form-group">
              <label htmlFor="input-email">EMail</label>
              <input value={this.state.email} onChange={(event) => this.handleChangeEMail(event)} type="email" className="form-control" id="input-email" />
            </div>
            <div className="form-group">
              <label htmlFor="input-passwort">Passwort</label>
              <input value={this.state.passwort} onChange={(event) => this.handleChangePasswort(event)} type="password" className="form-control" id="input-passwort" />
            </div>
            <button type="submit" className="btn btn-primary">Anmelden</button>
          </form>
          <div className="p-3 d-flex flex-column col-12 col-md-3 justify-content-center">
            <p>
              Ich habe mein <a href="/passwort-vergessen">Passwort vergessen</a>.
            </p>
            <p>
              Ich habe noch keinen Zugang und möchte mich <a href="/registrieren">registrieren</a>.
            </p>
          </div>
          <div className="col-12 col-md-2" />
        </div>
      </div>
    );
  }
}
