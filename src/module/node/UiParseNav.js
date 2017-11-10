import React, { PropTypes } from 'react';
import Icon from '../Icon.js';

class UiParseNav extends React.Component {
  render() {
    const { readOnly,
            onPnMouseOver,
            onPnMouseOut,
            onPnMouseUp,
            data } = this.props;

    const altParseInfoExists = data.hasOwnProperty("alternateParseInfo") && data.alternateParseInfo !== undefined;

    const arrowIcons = (direction) => {
      return (
        <div className={`node__word__ui__glyph node__word__ui__glyph--${direction}`}>
          <Icon symbol={`arrow-${direction}`} wrapperClass="node__word__ui__glyph__svg" />
          <Icon symbol={`arrow-${direction}--inverted`} wrapperClass="node__word__ui__glyph__svg--inverted" />
        </div>
      );
    }

    const createNavButton = (direction, target) => {
      return altParseInfoExists && data.alternateParseInfo.hasOwnProperty(`${target}Parse`) && !readOnly ? (
        <div className={`parse-nav-trigger-${direction}`}
          onMouseOver={onPnMouseOver}
          onMouseOut={onPnMouseOut}
          onMouseUp={() => { onPnMouseUp(data, target) }}>
          {arrowIcons(direction)}
        </div>
      ) : (
        <div className={`parse-nav-trigger-${direction} node__word__ui--disabled`}>
          {arrowIcons(direction)}
        </div>
      );
    }

    return (
      <div className="node__word__ui node__word__ui--parse-nav">
        {createNavButton("left", "prev")}
        {createNavButton("right", "next")}
      </div>
    );
  }
}

UiParseNav.propTypes = {
  readOnly: PropTypes.bool,
  data: PropTypes.object,
  onPnMouseOver: PropTypes.func,
  onPnMouseOut: PropTypes.func,
  onPnMouseUp: PropTypes.func,
}

export default UiParseNav;
