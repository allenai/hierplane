import { expandPathToNode } from '../../stores/modules/ui';

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';

import { colorToString } from '../../utils/helpers.js';

class PassageSpan extends Component {
  constructor() {
    super();
    this.state = {
      active: null, // null, hover, pressed
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseOver() {
    this.setState({
      active: "hover",
    }, () => { this.props.hoverNode(this.props.data.id) });
  }

  handleMouseOut() {
    this.setState({
      active: null,
    }, () => { this.props.hoverNode("none") });
  }

  handleMouseUp() {
    this.setState({
      active: "null",
    }, () => {
      const { data, expandPathToNode, focusNode } = this.props;

      expandPathToNode(data.id);
      focusNode(data);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.hoverNodeId === this.props.data.id ? "hover" : null,
    });
  }

  render() {
    const { active } = this.state;
    const { text,
            data,
            styles,
            selectedNodeId,
            parentId,
            depth,
            hoverNodeId,
            hoverNode,
            focusNode } = this.props;

    // Shorthand consts for fragment data
    const segmentsContainer = data.kind === "top-level-and";

    function getFragmentData({ alternateParseInfo }) {
      return alternateParseInfo && alternateParseInfo.spanAnnotations ? alternateParseInfo.spanAnnotations : null;
    }

    const fragmentData = getFragmentData(data);
    const textHi = text.length + 1;

    const populateSpans = (children, lo, hi, fragments = true) => {
      return children.map((childNode) => {
        // Shorthand consts for span data
        const hasSpan = childNode.hasOwnProperty("alternateParseInfo") && childNode.alternateParseInfo.hasOwnProperty("charNodeRoot");
        const spanField = hasSpan ? childNode.alternateParseInfo.charNodeRoot : null;
        const spanLo = fragments && hasSpan ? spanField.charLo : 0;
        const spanHi = fragments && hasSpan ? spanField.charHi : textHi;

        // If the child node span fits inside the bounds of the child fragment that triggered this recursion:
        if (spanLo >= lo && spanHi <= hi) {
          return (
            <PassageSpanWrapper
              key={childNode.id}
              selectedNodeId={selectedNodeId}
              hoverNodeId={hoverNodeId}
              hoverNode={hoverNode}
              focusNode={focusNode}
              parentId={data.id}
              data={childNode}
              styles={styles}
              text={text}
              depth={depth + 1} />
          );
        }
      });
    }

    // Conditional Logic handling how to output fragments:
    const printText = fragmentData ? fragmentData.map((item) => {
      // If fragment is type child then trigger recursive rendeirng of children:
      if (item.spanType === "child") {
        return populateSpans(data.children, item.lo, item.hi);
      // Otherwise, render the fragment now:
      } else {
        return (<span key={`${item.lo}-${item.hi}`} className={`span-slice__${item.spanType}`}>{text.slice(item.lo, item.hi)}</span>);
      }
      // Special case for segments container with no fragment data, otherwise return null
    }) : segmentsContainer && !fragmentData ? populateSpans(data.children, 0, textHi, false) : null;

    // Building list of conditional classes for span-slice
    const spanConditionalClasses = classNames({
      "span-slice--hover": active === "hover" || hoverNodeId === data.id,
      "span-slice--pressed": active === "pressed",
      "span-slice--focused": selectedNodeId === data.id,
      "span-slice--margin": depth === 0,
      [`span-slice--${colorToString(styles[data.kind])}`]: true,
    });

    const onMouseOver = !segmentsContainer ? this.handleMouseOver : null;
    const onMouseOut = !segmentsContainer ? this.handleMouseOut : null;
    const onMouseDown = !segmentsContainer ? () => {this.setState({active: "pressed"})} : null;
    const onMouseUp = !segmentsContainer ? this.handleMouseUp : null;

    return (
      <span className={`span-slice ${spanConditionalClasses}`}
        data-parent-id={(depth > 0) ? parentId : "null"}
        data-id={data.id}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}>
        {printText}
      </span>
    );
  }
}

PassageSpan.propTypes = {
  text: PropTypes.string.isRequired,
  data: PropTypes.object,
  styles: PropTypes.object,
  parentId: PropTypes.string,
  selectedNodeId: PropTypes.string,
  depth: PropTypes.number,
  hoverNodeId: PropTypes.string,
  hoverNode: PropTypes.func,
  focusNode: PropTypes.func,
  expandPathToNode: PropTypes.func.isRequired,
}

// We have no state to map to props, so we just return an empty object.
const mapStateToProps = () => ({});

// When PassageSpan is called recursively, it is using the local definition of the component and not the
// exported, "wrapped with connect" definition, which is a higher-ordered component that has been
// decorated with redux store state. The fix is to assign the wrapped version of Node to a new
// variable here, export that, and call it when we recurse.
const PassageSpanWrapper = connect(mapStateToProps, { expandPathToNode })(PassageSpan);

export default PassageSpanWrapper;
