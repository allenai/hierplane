import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon.js';

// `Toolbar` displays the Euclid tool buttons.
class PaneToggle extends React.Component {
  render() {
    const { sideBarCollapsed, togglePane, icon, mode } = this.props;

    return (
      <div className={`pane__toggle pane__toggle--${icon} ${sideBarCollapsed ? "pane__toggle--sidebar-collapsed" : ""}`} onClick={() => { togglePane(mode) }}>
        <Icon symbol={icon} wrapperClass="pane__toggle__glyph" />
      </div>
    );
  }
}

PaneToggle.propTypes = {
  sideBarCollapsed: PropTypes.bool,
  togglePane: PropTypes.func,
  icon: PropTypes.string,
  mode: PropTypes.string,
}

export default PaneToggle;
