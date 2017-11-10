import React, { PropTypes } from 'react';

class PanePanel extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  render() {
    const { collapsed } = this.state;
    const { panelHeader, panelContent, padded } = this.props;

    return (
      <div className={`pane__panel ${collapsed ? "pane__panel--collapsed" : ""}`}>
        <div className="pane__panel__header" onClick={() => {this.setState({collapsed: !this.state.collapsed})}}>
          <span>{panelHeader}</span>
        </div>
        <div className={`pane__panel__content ${padded ? "pane__panel__content--padded" : ""}`}>
          {panelContent}
        </div>
      </div>
    );
  }
}

PanePanel.propTypes = {
  panelHeader: PropTypes.string,
  panelContent: PropTypes.object,
  padded: PropTypes.bool,
}

export default PanePanel;
