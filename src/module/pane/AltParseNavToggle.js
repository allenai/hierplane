import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon.js';

class AltParseNavToggle extends React.Component {
  constructor() {
    super();
    this.state = {
      interaction: "idle", // idle, hover, active
    };

    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseUp() {
    this.setState({
      interaction: "hover",
    });
    this.props.fetchAltParse(this.props.selectedData, this.props.direction);
  }

  render() {
    const { direction, keyInteraction, disabled, loading } = this.props;
    const icoArrow = (<Icon symbol={`arrow-${direction === "prev" ? "left" : "right"}--inverted`} />);

    let altParseTrigger = null;

    if (disabled === false) {
      altParseTrigger = (
        <div className={`pane__alt-parse__nav__trigger-${direction}
            pane__alt-parse__nav--${keyInteraction === direction ? "active" : this.state.interaction}`}
          title={`load ${direction === "prev" ? "previous" : "next"} parse`}
          onMouseOver={() => {this.setState({interaction: "hover"})}}
          onMouseOut={() => {this.setState({interaction: "idle"})}}
          onMouseDown={() => {this.setState({interaction: "active"})}}
          onMouseUp={this.handleMouseUp}>
          {icoArrow}
        </div>
      );
    } else {
      altParseTrigger = (
        <div className={`pane__alt-parse__nav__trigger-${direction}
            ${loading === false ? "pane__alt-parse__nav--disabled" : ""}`}
          onMouseOut={() => {this.setState({interaction: "idle"})}}>
          {icoArrow}
        </div>
      );
    }

    return altParseTrigger;
  }
}

AltParseNavToggle.propTypes = {
  direction: PropTypes.string,
  keyInteraction: PropTypes.string,
  fetchAltParse: PropTypes.func,
  selectedData: PropTypes.object,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
}

export default AltParseNavToggle;
