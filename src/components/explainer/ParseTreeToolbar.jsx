import { collapseAllNodes, expandAllNodes } from '../../stores/modules/ui';

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

import TreeExpansionControl from './TreeExpansionControl.jsx';

class ParseTreeToolbar extends Component {
  static get propTypes() {
    return {
      collapseAllNodes: PropTypes.func.isRequired,
      expandAllNodes: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
    };
  }

  render() {
    const { collapseAllNodes, expandAllNodes, disabled } = this.props;

    return (
      <ul className={`parse-tree-toolbar ${disabled ? "parse-tree-toolbar--disabled" : ""}`}>
        <li className="parse-tree-toolbar__item">
          <TreeExpansionControl mode="implode" onClick={() => { collapseAllNodes() }}/>
          <div className="parse-tree-toolbar__item__label">Collapse all nodes</div>
          <div className="parse-tree-toolbar__item__mask"></div>
        </li>
        <li className="parse-tree-toolbar__item">
          <TreeExpansionControl mode="explode" onClick={() => { expandAllNodes() }} />
          <div className="parse-tree-toolbar__item__label">Expand all nodes</div>
          <div className="parse-tree-toolbar__item__mask"></div>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = ({ ui }) => ({ exploded: ui.exploded });

export default connect(mapStateToProps, { collapseAllNodes, expandAllNodes })(ParseTreeToolbar);
