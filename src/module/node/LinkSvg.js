import PropTypes from 'prop-types';
import React from 'react';

class LinkSvg extends React.Component {
  render() {
    const { capPos, viewBox, fillPoints, strokePoints } = this.props;

    return (
      <div className={`node__word__link__tab__${capPos}-cap`}>
        <svg viewBox={viewBox} preserveAspectRatio="none">
          <polyline points={fillPoints} className="node__word__link__tab__svg__fill" />
          <polyline points={strokePoints} className="node__word__link__tab__svg__stroke" />
        </svg>
      </div>
    );
  }
}

LinkSvg.propTypes = {
  capPos: PropTypes.string,
  viewBox: PropTypes.string,
  fillPoints: PropTypes.string,
  strokePoints: PropTypes.string,
}

export default LinkSvg;
