import React from 'react';

export const Message = function(props) {
  return (<div className={"alert alert-" + props.severity + " alert-dismissible fade show"} role="alert">{props.value}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>);
}
