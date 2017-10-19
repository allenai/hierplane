import React, { PropTypes } from 'react';
import Attributes from './Attributes.jsx';
import Link from './Link.jsx';
import UiToggle from './UiToggle.jsx';
import UiParseNav from './UiParseNav.jsx';

class NodeWord extends React.Component {

  render() {
    const { readOnly,
            hasInsideChildren,
            layout,
            dataPos,
            positions,
            linkLabels,
            data,
            text,
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
            dataCollapsable,
            altParses,
            rollups,
            isRoot,
            isEventRoot,
            togglePane,
            insideChildren,
            eventSeqChild,
            encapsulated,
            notFirstInsideChild } = this.props;

    // charNodeRoot is the field in the JSON node object that contains its span's
    // lo and hi values that let the UI extract a phrase from the original query.
    const hasFragments = data.hasOwnProperty("alternateParseInfo") && data.alternateParseInfo.hasOwnProperty("spanAnnotations");
    const hasRollup = rollups && dataCollapsable && hasFragments;
    const fragmentData = hasFragments ? data.alternateParseInfo.spanAnnotations : null;

    // Max rollup characters before node is forced to text wrap
    const maxRollupChars = 40;
    // Boolean that returns true if node span is more than maxRollupChars (used in conditional class of .node__word__label)
    const wideRollup = hasRollup && (data.alternateParseInfo.charNodeRoot.charHi - data.alternateParseInfo.charNodeRoot.charLo >= maxRollupChars);

    // Iterates through spanAnnotations to wrap head word ("self") in a <strong> tag
    // so it is visually distinct from the rest of the rollup text.
    const rollupText = hasFragments ? fragmentData.map((item, index) => {
      if (item.spanType === "self") {
        return (
          <strong key={index}> {text.slice(item.lo, item.hi)} </strong>
        );
      } else {
        return ` ${text.slice(item.lo, item.hi)} `;
      }
    }) : null;

    const toggle = (
      <UiToggle
        onUiMouseOver={onUiMouseOver}
        onUiMouseOut={onUiMouseOut}
        onUiMouseUp={onUiMouseUp} />
    );

    const parseNav = (
      <UiParseNav
        readOnly={readOnly}
        data={data}
        onPnMouseOver={onPnMouseOver}
        onPnMouseOut={onPnMouseOut}
        onPnMouseUp={onPnMouseUp} />
    );

    const focusTrigger = (
      <div className={`node-focus-trigger ${hasInsideChildren ? "node-focus-trigger--seq" : ""}`}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onMouseDown={onMouseDown}
        onDoubleClick={() => { togglePane("open") }}
        onMouseUp={() => { onMouseUp(data) }}>
      </div>
    );

    return (
      !isRoot ? (
        <div className={`node__word
            ${hasInsideChildren && data.attributes.length > 0 ? "node__word--has-attrs" : ""}
            ${hasRollup ? "node__word--has-rollup" : ""}`}>
          {/* Node Word Tile */}
          <div className="node__word__tile"></div>
          {/* Left / Top Link */}
          {((!isEventRoot && data.link && layout === "canonical") ||
            (!isEventRoot && data.link && layout === "default" && positions[data.link] !== "left" && notFirstInsideChild && !encapsulated && !eventSeqChild)) ?
            <Link link={data.link} dataPos={dataPos} layout={layout} linkLabels={linkLabels} id={data.id} /> : null}
          <div className="node__word__content">
            {/* Node Word Label */}
            <div className={`node__word__label ${wideRollup ? "node__word__label--wide" : ""}`}>
              <div className="node__word__label__siblings">
                <span className="node__word__label__headword" id={"node-" + data.id + "-word"}>{data.word}</span>
                {hasRollup ? (<span className="node__word__label__rollup" id={"node-" + data.id + "-span"}>{rollupText}</span>) : null}
              </div>
            </div>
            {hasInsideChildren ? insideChildren : null}
            {/* Attributes */}
            <Attributes attrs={data.attributes} id={data.id} />
          </div>
          {/* Right Link */}
          {(!encapsulated && !eventSeqChild && data.link && layout === "default" && positions[data.link] === "left") ?
            <Link link={data.link} dataPos={dataPos} layout={layout} linkLabels={linkLabels} id={data.id} /> : null}
          {focusTrigger}
          {/* UI Toggle */}
          {(dataCollapsable) ? toggle : null}
          {(altParses) ? parseNav : null}
        </div>) : (
          (altParses) ? (
            <div className="node__segments">
              {focusTrigger}
              {(altParses) ? parseNav : null}
            </div>
        ) : null
      )
    );
  }
}

NodeWord.propTypes = {
  readOnly: PropTypes.bool,
  positions: PropTypes.object.isRequired,
  linkLabels: PropTypes.object.isRequired,
  data: PropTypes.shape({
    attributes: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
  text: PropTypes.string,
  layout: PropTypes.string.isRequired,
  dataPos: PropTypes.string.isRequired,
  hasInsideChildren: PropTypes.bool,
  dataCollapsable: PropTypes.bool.isRequired,
  altParses: PropTypes.bool.isRequired,
  rollups: PropTypes.bool.isRequired,
  isRoot: PropTypes.bool.isRequired,
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
  insideChildren: PropTypes.object,
  eventSeqChild: PropTypes.bool,
  encapsulated: PropTypes.bool,
  notFirstInsideChild: PropTypes.bool,
}

export default NodeWord;
