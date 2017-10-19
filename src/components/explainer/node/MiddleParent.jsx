import React, { Component, PropTypes } from 'react';
import NodeWord from './NodeWord.jsx';
import classNames from 'classnames/bind';

import { colorToString } from '../../../utils/helpers.js';

// Converts an array of classes to string.
function stylesToString(arr = []) {
  return arr.reduce((str, style) => {
    return "node--" + style + " " + str;
  }, "");
}

class MiddleParent extends Component {

  // TODO: Try to pull as much business logic out of the render function as possible.
  render() {
    const { readOnly,
            canonicalChildren,
            hasChildren,
            hasSideChildren,
            hasInsideChildren,
            hasDownChildren,
            layout,
            positions,
            linkLabels,
            data,
            depth,
            styles,
            active,
            collapsed,
            nodeFocusing,
            dataCollapsable,
            rollups,
            isRoot,
            isSingleSegment,
            isEventRoot,
            onMouseOver,
            onMouseOut,
            onMouseDown,
            onMouseUp,
            onUiMouseOver,
            onUiMouseOut,
            onUiMouseUp,
            onPnMouseOver,
            onPnMouseOut,
            onPnMouseUp,
            text,
            parentId,
            togglePane,
            insideChildren,
            directionalChildIndex,
            dataPos,
            eventSeqChild,
            encapsulated,
            notFirstInsideChild,
            seqType,
            focused } = this.props;

    const { id, kind } = data;

    const altParseInfo = data.alternateParseInfo;
    const altParses = altParseInfo !== undefined && (altParseInfo.hasOwnProperty("prevParse") || altParseInfo.hasOwnProperty("nextParse"));
    const nodeCollapsed = dataCollapsable && collapsed && (!hasSideChildren || (hasSideChildren && hasInsideChildren)) && !isRoot && !isEventRoot;

    // nodeConditionalClasses builds dynamic class lists for .node blocks:
    const nodeConditionalClasses = classNames({
      "node--root": isRoot,
      "node--has-alt-parses": altParses,
      "node--hover": active === "hover",
      "node--toggle-ready": active === "toggle-ready",
      "node--focused": focused,
      "node--focusing": nodeFocusing,
      "node--encapsulated": encapsulated,
      "node-container--collapsed": nodeCollapsed,
      "node-container--expanded": !nodeCollapsed,
      "node-container--active": active !== null && hasChildren && !hasSideChildren,
      [`${stylesToString(styles[data.kind])}`]: true,
      [`node--${colorToString(styles[seqType])}`]: seqType !== null,
    });

    // Screen Output
    return (
      <div className="ft__tr__td ft--middle-parent">
        {/* Node */}
        <div className={`node ${nodeConditionalClasses}`}
          id={id}
          data-parent-id={(depth > 0) ? parentId : "null"}
          data-kind={kind}
          data-pos={dataPos}
          data-is-root={isRoot}
          data-is-single-segment={isSingleSegment}
          data-is-event-root={isEventRoot}
          data-depth={depth}
          data-has-children={hasChildren}
          data-has-side-children={hasSideChildren}
          data-has-inside-children={hasInsideChildren}
          data-has-down-children={hasDownChildren}
          data-collapsable={dataCollapsable}
          data-directional-child-index={directionalChildIndex}
          data-alt-parses={altParses} >
          {/* Node Word */}
          <NodeWord
            readOnly={readOnly}
            depth={depth}
            layout={layout}
            dataPos={dataPos}
            positions={positions}
            linkLabels={linkLabels}
            data={data}
            text={text}
            dataCollapsable={dataCollapsable}
            altParses={altParses}
            rollups={rollups}
            isRoot={isRoot}
            isEventRoot={isEventRoot}
            hasChildren={hasChildren}
            hasSideChildren={hasSideChildren}
            hasInsideChildren={hasInsideChildren}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onUiMouseOver={onUiMouseOver}
            onUiMouseOut={onUiMouseOut}
            onUiMouseUp={onUiMouseUp}
            onPnMouseOver={onPnMouseOver}
            onPnMouseOut={onPnMouseOut}
            onPnMouseUp={onPnMouseUp}
            togglePane={togglePane}
            insideChildren={insideChildren}
            encapsulated={encapsulated}
            eventSeqChild={eventSeqChild}
            notFirstInsideChild={notFirstInsideChild} />

          {/* Canonical Children */}
          {canonicalChildren}
        </div>
      </div>
    );
  }
}

MiddleParent.propTypes = {
  readOnly: PropTypes.bool,
  styles: PropTypes.object.isRequired,
  positions: PropTypes.object.isRequired,
  linkLabels: PropTypes.object.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string,
    kind: PropTypes.string,
    word: PropTypes.string,
    attributes: PropTypes.arrayOf(PropTypes.string.isRequired),
    children: PropTypes.arrayOf(PropTypes.object.isRequired),
    link: PropTypes.string,
  }),
  text: PropTypes.string,
  depth: PropTypes.number.isRequired,
  layout: PropTypes.string.isRequired,
  hasChildren: PropTypes.bool.isRequired,
  hasSideChildren: PropTypes.bool.isRequired,
  hasInsideChildren: PropTypes.bool,
  hasDownChildren: PropTypes.bool,
  canonicalChildren: PropTypes.object,
  active: PropTypes.string,
  collapsed: PropTypes.bool.isRequired,
  nodeFocusing: PropTypes.bool.isRequired,
  dataCollapsable: PropTypes.bool.isRequired,
  rollups: PropTypes.bool.isRequired,
  isRoot: PropTypes.bool.isRequired,
  isSingleSegment: PropTypes.bool,
  isEventRoot: PropTypes.bool.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onUiMouseOver: PropTypes.func.isRequired,
  onUiMouseOut: PropTypes.func.isRequired,
  onUiMouseUp: PropTypes.func.isRequired,
  onPnMouseOver: PropTypes.func.isRequired,
  onPnMouseOut: PropTypes.func.isRequired,
  onPnMouseUp: PropTypes.func.isRequired,
  togglePane: PropTypes.func,
  parentId: PropTypes.string,
  insideChildren: PropTypes.object,
  directionalChildIndex: PropTypes.number,
  dataPos: PropTypes.string,
  eventSeqChild: PropTypes.bool,
  encapsulated: PropTypes.bool,
  notFirstInsideChild: PropTypes.bool,
  seqType: PropTypes.string,
  focused: PropTypes.bool,
}

export default MiddleParent;
