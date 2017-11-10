import React, { PropTypes } from 'react';

class TreeExpansionControl extends React.Component {
  render() {
    const { mode, onClick } = this.props;

    // Enforce valid values of mode property
    const validModes = new Set([
      "explode",
      "implode",
    ]);
    if (!validModes.has(mode)) {
      throw new Error(`Invalid value of property "mode". Expected ("${Array.from(validModes).join("\" or \"")}") but found "${mode}" instead.`);
    }

    return (
      <div className="tree-expansion-control">
        <div className={`tree-expansion-control__glyph tree-expansion-control__glyph--${mode}`}>
          <div className="tree-expansion-control__glyph__triangle tree-expansion-control__glyph__triangle--down"></div>
          <div className="tree-expansion-control__glyph__triangle tree-expansion-control__glyph__triangle--up"></div>
          <div className="tree-expansion-control__glyph__triangle tree-expansion-control__glyph__triangle--left"></div>
          <div className="tree-expansion-control__glyph__triangle tree-expansion-control__glyph__triangle--right"></div>
        </div>
        <div className="tree-expansion-control__trigger"
          onClick={onClick}>
        </div>
      </div>
    );
  }
}

TreeExpansionControl.propTypes = {
  mode: PropTypes.string,
  onClick: PropTypes.func,
}

export default TreeExpansionControl;
