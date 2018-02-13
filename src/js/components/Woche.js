import React from 'react';
import Tag from './Tag.js';

export default class Woche extends React.Component {
  render() {
    const monatsNamenLang = [
      "Januar", "Februar", "März", "April",
      "Mai", "Juni", "Juli", "August",
      "September", "Oktober", "November", "Dezember"
    ];

    let monatsName = monatsNamenLang[this.props.tage[0].monat - 1];

    let tage = [];

    for (var i = 0; i < 7; i++) {
      tage.push(<Tag key={i} index={i} tag={this.props.tage[i]} />);
    }

    return (
      <div className="row">
        <div className={"kw col-md-1 text-center text-md-left"}>
          <span className={"d-inline-block d-md-none"}>{monatsName} - Kalenderwoche&nbsp;</span>
          {this.props.index + 1}
        </div>
        {tage}
        <div className="woche-kommentar col-md-4">

        </div>
      </div>
    );
  }
}
