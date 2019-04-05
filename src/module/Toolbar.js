import PropTypes from 'prop-types';
import React from 'react';

// `Toolbar` displays the Euclid tool buttons.
class Toolbar extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const win = window.open("", "_blank");
    const data = this.props.selectedData;
    const hasParses = data.hasOwnProperty("alternateParseInfo") && data.alternateParseInfo.hasOwnProperty("currentParseIndex");

    if (win) {
      win.document.write("<pre>" + JSON.stringify(this.props.jsonData, null, 2) + "</pre>");
      win.document.title = `${hasParses ? "Parse: " + data.alternateParseInfo.currentParseIndex + "  |  " : ""}Node: ${data.id}`;
      win.focus();
    } else {
      alert('Please allow popups for this website');
    }
  }

  render() {
    const { jsonUrl,
            serverEndPoint } = this.props;

    let jsonBtn;
    if (serverEndPoint) {
      jsonBtn = (<a className="toolbar__button__link" target="_blank" href={jsonUrl}>JSON</a>);
    } else {
      jsonBtn = (<div className="toolbar__button__link" onClick={this.handleClick}>JSON</div>);
    }

    return (
      <ul className="toolbar">
        <li className="toolbar__button">
          {jsonBtn}
        </li>
      </ul>
    );
  }
}

Toolbar.propTypes = {
  jsonUrl: PropTypes.string,
  serverEndPoint: PropTypes.bool,
  jsonData: PropTypes.object,
  selectedData: PropTypes.object,
}

export default Toolbar;
