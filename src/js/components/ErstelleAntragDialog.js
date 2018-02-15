import React from 'react';

export default class ErstelleAntragDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      beginn: '',
      ende: '',
      antragstyp: 'Urlaub',
      genehmigt: true,
      kommentar: ''
    };
  }

  handleChangeBeginn(event) {
    this.setState({beginn: event.target.value});
  }

  handleChangeEnde(event) {
    this.setState({ende: event.target.value});
  }

  handleChangeAntragstyp(event) {
    this.setState({antragstyp: event.target.value});
  }

  handleChangeGenehmigt(event) {
    this.setState({genehmigt: event.target.value});
  }

  handleChangeKommentar(event) {
    this.setState({kommentar: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <form
        id="erstelle-antrag-dialog"
        noValidate
        className="modal fade"
        onSubmit={(event) => this.handleSubmit(event)}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Erstelle Antrag</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Abbruch">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="select-antragstyp">Antragstyp</label>
                <select
                  className="custom-select"
                  id="select-antragstyp"
                  required
                  value={this.state.antragstyp}
                  onChange={(event) => this.handleChangeAntragstyp(event)}
                >
                  <option>Urlaub</option>
                  <option>Bildungsurlaub</option>
                  <option>Krankheit</option>
                </select>
                <div className="invalid-feedback">Bitte wählen Sie einen Typ aus.</div>
              </div>
              <div className="row">
                <div className="col form-group">
                  <label htmlFor="input-datum-beginn">Beginn</label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-datum-beginn"
                    placeholder="tt.mm."
                    required
                    value={this.state.beginn}
                    onChange={(event) => this.handleChangeBeginn(event)}
                  />
                  <div className="invalid-feedback">Bitte geben Sie den Beginn an.</div>
                </div>
                <div className="col form-group">
                  <label htmlFor="input-datum-ende">Ende</label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-datum-ende" placeholder="tt.mm."
                    required
                    value={this.state.ende}
                    onChange={(event) => this.handleChangeEnde(event)}
                  />
                  <div className="invalid-feedback">Bitte geben Sie das Ende an.</div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="input-kommentar">Kommentar</label>
                <textarea
                  className="form-control"
                  id="input-kommentar"
                  rows="2" value={this.state.kommentar}
                  onChange={(event) => this.handleChangeKommentar(event)}
                />
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="input-genehmigt"
                  value={this.state.genehmigt}
                  onChange={(event) => this.handleChangeGenehmigt(event)}
                />
                <label className="custom-control-label" htmlFor="input-genehmigt">genehmigt</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Abbruch</button>
              <button type="submit" className="btn btn-primary">Erstellen</button>
            </div>
        </div>
      </div>
      </form>
    );
  }
}
