import React from 'react';
import Tag from './Tag.js';
import { MONATS_NAMEN_LANG } from '../constants.js';

export default class Woche extends React.Component {
  render() {
    let monatsName = MONATS_NAMEN_LANG[this.props.tage[0].monat - 1];

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
