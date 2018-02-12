import React from 'react';
import $ from 'jquery';
import Message from './Message.js';
import Woche from './Woche.js';

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
      url: "http://localhost:8080/kalender/v1/" + jahr
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

      for (var j = 1; j < data.length - 1; j++) {
        data[j].prevTagFeiertag = (data[j - 1].feiertag != null);
        data[j].nextTagFeiertag = (data[j + 1].feiertag != null);
      }

      this.setState({
        tageDesJahres: data,
        selektiertesJahr: jahr
      });
    }, (jqXHR, exception) => {
      let errorMessage = null;

      if (jqXHR.status === 0) {
        errorMessage = "Eine Anfrage an den Server konnte nicht gesendet werden";
      } else if (jqXHR.status === 404) {
        errorMessage = "Die angeforderte Seite wurde nicht gefunden";
      } else if (jqXHR.status === 500) {
        errorMessage = "Interner Server Fehler";
      } else {
        errorMessage = "Es ist ein unbekannter Fehler aufgetreten. Status Code: " + jqXHR.status + ", Meldung: " + exception;
      }

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
        <h1>Kalender {this.state.selektiertesJahr}</h1>
        {message}
        <button type="button" onClick={this.handleClickNavigiereZurueck.bind(this)}>&lt;-</button>
        <button type="button" onClick={this.handleClickNavigiereVor.bind(this)}>-&gt;</button>
        <div className="container-fluid">
          {wochen}
        </div>
      </div>
    );
  }
}
