import React from 'react';
import $ from 'jquery';
import Message from './Message.js';
import Woche from './Woche.js';
import ErstelleAntragDialog from './ErstelleAntragDialog.js';
import { SERVICE_KALENDER, XHR_ERROR_NO_CONNECTION, XHR_ERROR_404, XHR_ERROR_500, XHR_ERROR_UNKNOWN, MONATS_NAMEN_KURZ } from '../constants.js';

export default class Kalender extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tageDesJahres: [],
      selektiertesJahr: (new Date()).getFullYear()
    }
  }

  requestKalender(jahr) {
    $.ajax({
      url: SERVICE_KALENDER + jahr
    }).then((data) => {
      const offsets = {
        "Mo": 0, "Di": 1, "Mi": 2, "Do": 3, "Fr": 4, "Sa": 5, "So": 6
      };

      var offsetAnfangDesJahres = offsets[data[0].wochentag];

      for (var i = 0; i < offsetAnfangDesJahres; i++) {
        data.splice(0, 0, {
          "jahr": jahr - 1,
          "kalenderwoche": null,
          "monat": 12,
          "tag": 31 - i,
          "wochentag": null,
          "feiertag": null
        });
      }

      this.setState({
        tageDesJahres: data,
        selektiertesJahr: jahr
      });
    }, (jqXHR, exception) => {
      let errorMessage = null;

      if (jqXHR.status === 0) {
        errorMessage = XHR_ERROR_NO_CONNECTION;
      } else if (jqXHR.status === 404) {
        errorMessage = XHR_ERROR_404;
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
  }

  componentDidMount() {
    this.requestKalender(this.state.selektiertesJahr);
  }

  handleClickNavigiereZurueck() {
    this.requestKalender(this.state.selektiertesJahr - 1);
  }

  handleClickNavigiereVor() {
    this.requestKalender(this.state.selektiertesJahr + 1);
  }

  render() {
    var wochen = [];
    var tageDerWoche = [];
    var kalenderwoche = 0;
    var message = null;

    let octicons = require('octicons');

    for (var i = 0; i < this.state.tageDesJahres.length; i++) {
      tageDerWoche.push(this.state.tageDesJahres[i]);

      if (i !== 0 && (i + 1) % 7 === 0) {
        wochen.push(<Woche key={kalenderwoche} index={kalenderwoche} tage={tageDerWoche} />);
        tageDerWoche = [];
        kalenderwoche++;
      }
    }

    if (this.state.errorMessage != null) {
      message = (<Message severity="danger" value={this.state.errorMessage} />);
    }

    return (
      <div id="kalender">
        <ErstelleAntragDialog />
        <nav className="navbar fixed-bottom navbar-light bg-light">
          <div className="d-flex d-md-inline-flex flex-row justify-content-between">
            <button className="btn" type="button" dangerouslySetInnerHTML={{__html: octicons['triangle-left'].toSVG()}} onClick={this.handleClickNavigiereZurueck.bind(this)} />
            <div className="align-self-center px-3">{this.state.selektiertesJahr}</div>
            <button className="btn" type="button" dangerouslySetInnerHTML={{__html: octicons['triangle-right'].toSVG()}} onClick={this.handleClickNavigiereVor.bind(this)} />
          </div>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#erstelle-antrag-dialog">Erstelle Antrag</button>
          <div className="d-flex d-md-inline-flex flex-row flex-wrap justify-content-left">
            <a className="pr-3" href="#monat-1">{MONATS_NAMEN_KURZ[0]}</a>
            <a className="pr-3" href="#monat-2">{MONATS_NAMEN_KURZ[1]}</a>
            <a className="pr-3" href="#monat-3">{MONATS_NAMEN_KURZ[2]}</a>
            <a className="pr-3" href="#monat-4">{MONATS_NAMEN_KURZ[3]}</a>
            <a className="pr-3" href="#monat-5">{MONATS_NAMEN_KURZ[4]}</a>
            <a className="pr-3" href="#monat-6">{MONATS_NAMEN_KURZ[5]}</a>
            <a className="pr-3" href="#monat-7">{MONATS_NAMEN_KURZ[6]}</a>
            <a className="pr-3" href="#monat-8">{MONATS_NAMEN_KURZ[7]}</a>
            <a className="pr-3" href="#monat-9">{MONATS_NAMEN_KURZ[8]}</a>
            <a className="pr-3" href="#monat-10">{MONATS_NAMEN_KURZ[9]}</a>
            <a className="pr-3" href="#monat-11">{MONATS_NAMEN_KURZ[10]}</a>
            <a                  href="#monat-12">{MONATS_NAMEN_KURZ[11]}</a>
          </div>
        </nav>
        {message}
        <div className="container-fluid">
          {wochen}
        </div>
      </div>
    );
  }
}
