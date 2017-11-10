import React, { PropTypes } from 'react';

// `Toolbar` displays the Euclid tool buttons.
class PaneHandler extends React.Component {
  render() {
    const { onMouseDown, onDoubleClick, direction } = this.props;

    return (
      <div id="sidebar-handler"
        className={`pane__handler pane__handler--${direction}`}
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}>
        <div className="pane__handler__thumb">
          <div className="pane__handler__thumb__highlight"></div>
        </div>
      </div>
    );
  }
}

PaneHandler.propTypes = {
  onMouseDown: PropTypes.func,
  onDoubleClick: PropTypes.func,
  direction: PropTypes.string,
}

export default PaneHandler;
