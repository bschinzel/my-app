import React from 'react';
import $ from 'jquery';

class Tag extends React.Component {

    constructor(props) {
      super(props);

      this.state = {

      };
    }

    render() {
      var monatsName = null;

      if (this.props.tag.tag === 1) {
        const monatsNamenKurz = [
          "Jan", "Feb", "Mrz", "Apr",
          "Mai", "Jun", "Jul", "Aug",
          "Sep", "Okt", "Nov", "Dez"
        ];

        monatsName = ". " +  monatsNamenKurz[this.props.tag.monat - 1];
      }

      var highlightMonat = this.props.tag.monat % 2 === 0;

      var highlightFeiertag = "";
      var feiertagTooltip = null;

      if (this.props.tag.feiertag != null) {
        feiertagTooltip = (<FeiertagTooltip details={this.props.tag.feiertag} />);

        if (this.props.tag.prevTagFeiertag === true && this.props.tag.nextTagFeiertag === true) {
          highlightFeiertag = "highlight-feiertag-mitte";
        } else if (this.props.tag.prevTagFeiertag === true && this.props.tag.nextTagFeiertag === false) {
          highlightFeiertag = "highlight-feiertag-ende";
        } else if (this.props.tag.prevTagFeiertag === false && this.props.tag.nextTagFeiertag === true) {
          highlightFeiertag = "highlight-feiertag-start";
        } else if (this.props.tag.prevTagFeiertag === false && this.props.tag.nextTagFeiertag === false) {
          highlightFeiertag = "highlight-feiertag-einzeln";
        } else {
          console.log(this.props.tag.prevTagFeiertag); // TODO
        }
      }

      var highlightWochenende = this.props.tag.wochentag === "Sa" || this.props.tag.wochentag === "So";

      return (
          <div className={
            "tooltip-container"
          + " tag "
          + " col-md-1"
          + " highlight-wochenende-" + highlightWochenende
          + " " + highlightFeiertag
          + " highlight-monat-" + highlightMonat + ""}>
            <span className="tag">{this.props.tag.tag}</span>{monatsName}
            {feiertagTooltip}
          </div>
      );
    }
}

class FeiertagTooltip extends React.Component {

  render() {
    var bundesweitText = this.props.details.bundesweit ? "Bundesweiter Feiertag" : "Hessischer Feiertag";

    return (
          <div className="tooltip-text">
            <a href={this.props.details.url}
              target="_blank">
              {this.props.details.gesetzlicheBezeichnung}
            </a><br />
            {bundesweitText}
            <br />{this.props.details.anmerkung}
          </div>
    );
  }
}

class Woche extends React.Component {
  render() {
    var tage = [];

    for (var i = 0; i < 7; i++) {
      tage.push(<Tag key={i} index={i} tag={this.props.tage[i]} />);
    }

    return (
      <div className="row">
        <div className={"kw col-md-1"}>
          {this.props.index + 1}
        </div>
        {tage}
        <div className="woche-kommentar col-md-4">

        </div>
      </div>
    );
  }
}

const Message = function(props) {
  return (<div className={"alert alert-" + props.severity + " alert-dismissible fade show"} role="alert">{props.value}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>);
}

class Kalender extends React.Component {

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

const App = function(props) {
    return (
      <Kalender />
    );
}

export default App;
