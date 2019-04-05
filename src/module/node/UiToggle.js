import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon.js';

class UiToggle extends React.Component {
  render() {
    const { onUiMouseOver, onUiMouseOut, onUiMouseUp } = this.props;

    return (
      <div className="node__word__ui node__word__ui--toggle"
        onMouseOver={onUiMouseOver}
        onMouseOut={onUiMouseOut}
        onMouseUp={onUiMouseUp}>
        <div className="node__word__ui__glyph">
          <Icon symbol="expand" wrapperClass="node__word__ui__glyph__svg node__word__ui__glyph__svg--expand" />
          <Icon symbol="collapse" wrapperClass="node__word__ui__glyph__svg node__word__ui__glyph__svg--collapse" />
        </div>
      </div>
    );
  }
}

UiToggle.propTypes = {
  onUiMouseOver: PropTypes.func,
  onUiMouseOut: PropTypes.func,
  onUiMouseUp: PropTypes.func,
}

export default UiToggle;
