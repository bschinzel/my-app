import React from 'react';

export default class FeiertagTooltip extends React.Component {

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
