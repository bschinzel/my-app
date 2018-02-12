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
