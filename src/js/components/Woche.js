import React from 'react';
import Tag from './Tag.js';

export default class Woche extends React.Component {
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
