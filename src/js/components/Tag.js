import React from 'react';
import $ from 'jquery';
import FeiertagTooltip from './FeiertagTooltip.js';

export default class Tag extends React.Component {

    constructor(props) {
      super(props);

      this.state = {

      };
    }

    render() {
      let monatsName = null;
      let anchor = null;

      if (this.props.tag.tag === 1) {
        const monatsNamenKurz = [
          "Jan", "Feb", "Mrz", "Apr",
          "Mai", "Jun", "Jul", "Aug",
          "Sep", "Okt", "Nov", "Dez"
        ];

        monatsName = ". " +  monatsNamenKurz[this.props.tag.monat - 1];
        anchor = (<a id={"monat-" + this.props.tag.monat} className="monat-anchor" />);
      }

      var highlightMonat = this.props.tag.monat % 2 === 0;

      var highlightFeiertag = false;
      var feiertagTooltip = null;

      if (this.props.tag.feiertag != null) {
        feiertagTooltip = (<FeiertagTooltip details={this.props.tag.feiertag} />);
        highlightFeiertag = true;
      }

      var highlightWochenende = this.props.tag.wochentag === "Sa" || this.props.tag.wochentag === "So";

      return (
          <div className={
            "tooltip-container"
          + " tag "
          + " col-md-1"
          + " highlight-wochenende-" + highlightWochenende
          + " highlight-monat-" + highlightMonat + ""}>
            {anchor}
            <div className={"highlight-feiertag-" + highlightFeiertag}>
              <span className="tag">{this.props.tag.tag}</span>{monatsName}
            </div>
            {feiertagTooltip}
            <span className={"d-inline-block d-md-none highlight-feiertag-" + highlightFeiertag}>{this.props.tag.wochentag}</span>
          </div>
      );
    }
}
