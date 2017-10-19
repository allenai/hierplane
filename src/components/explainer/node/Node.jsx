import Link from './Link.jsx';
import MiddleParent from './MiddleParent.jsx';

import { expandNode, toggleNode } from '../../../stores/modules/ui';

import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import React, { Component, PropTypes } from 'react';

class Node extends Component {
  constructor() {
    super();
    this.state = {
      active: null,
      nodeFocusing: false,
      rollups: true,
      focused: false,
    };

    this.handleNodeMouseUp = this.handleNodeMouseUp.bind(this);
    this.handleUiToggleMouseUp = this.handleUiToggleMouseUp.bind(this);
    this.handlePnToggleMouseUp = this.handlePnToggleMouseUp.bind(this);
    this.handleNodeMouseOver = this.handleNodeMouseOver.bind(this);
    this.handleNodeMouseOut = this.handleNodeMouseOut.bind(this);
    this.handleNodeFocus = this.handleNodeFocus.bind(this);
  }

  // Returns arrays of children grouped by positions set in
  // linkToPosition in the JSON:
  createChildren (children, positions) {
    return children.reduce((children, child) => {
      let index = positions[child.link]
      if (index in children) {
        children[index].push(child);
      }
      else {
        children["down"].push(child);
      }
      return children;
    }, { left: [], right: [], down: [], inside: [] });
  }

  // Returns arrays of inside children grouped by kind:
  countSeqChildren (children) {
    return children.reduce((children, child) => {
      const supportedKinds = new Set(["event", "entity", "detail"]);
      if (supportedKinds.has(child.kind)) {
        children[child.kind].push(child);
      }
      return children;
    }, { event: [], entity: [], detail: [] });
  }

  // Node MouseUp Handler:
  handleNodeMouseUp(data) {
    const { focusNode, expandNode } = this.props;

    this.setState({ nodeFocusing: false }, () => {
      focusNode(data);
      expandNode(data.id);
      this.handleNodeFocus();
    });
  }

  // UiToggle MouseUp Handler:
  handleUiToggleMouseUp() {
    const { data, toggleNode } = this.props;

    toggleNode(data.id);

    this.setState({ active: null });
  }

  // UiParseNav MouseUp Handler:
  handlePnToggleMouseUp(nodeData, direction) {
    const { data, fetchAltParse, loading } = this.props;

    this.handleNodeMouseUp(data);

    if (!loading) {
      fetchAltParse(nodeData, direction);
    }
  }

  handleNodeMouseOver() {
    this.setState({
      active: "hover",
    }, () => { this.props.hoverNode(this.props.data.id) });
  }

  handleNodeMouseOut() {
    this.setState({
      active: null,
    }, () => { this.props.hoverNode("none") });
  }

  handleNodeFocus() {
    const { data, expandNode } = this.props;

    this.setState({
      focused: true,
      nodeFocusing: false,
    }, () => {
      expandNode(data.id);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.hoverNodeId === this.props.data.id ? "hover" : null,
    });

    if (nextProps.selectedNodeId === this.props.data.id) {
      if (nextProps.selectedNodeId !== this.props.selectedNodeId) {
        this.handleNodeFocus();
      }
    } else {
      this.setState({
        focused: false,
      });
    }
  }

  // TODO: Try to pull as much business logic out of the render function as possible.
  render() {
    const { active, nodeFocusing, rollups, focused } = this.state;
    const { readOnly,
            styles,
            positions,
            linkLabels,
            data,
            layout,
            depth,
            parentId,
            text,
            selectedNodeId,
            hoverNodeId,
            isSingleSegment,
            focusNode,
            hoverNode,
            fetchAltParse,
            togglePane,
            directionalChildIndex,
            loading,
            expandedNodeIds } = this.props;

    let leftChildren = null,
        rightChildren = null,
        downChildren = null,
        insideChildren = null,
        canonicalChildren = null;

    let childNodes;
    // Immediate child position detection and array building.
    if (data.children) {
      childNodes = this.createChildren(data.children, positions);
    }

    let seqType = null,
        seqChildren;

    // Setting value of seqType (sequence inherits type based on kind of its inside children)
    if (data.children && data.kind === "sequence" && childNodes.inside.length > 0) {
      seqChildren = this.countSeqChildren(childNodes.inside);
      switch (childNodes.inside.length) {
        case seqChildren.event.length:
          seqType = "event";
          break;
        case seqChildren.entity.length:
          seqType = "entity";
          break;
        case seqChildren.detail.length:
          seqType = "detail";
          break;
        default:
          seqType = null;
      }
    }

    let hasChildren = false,
        hasSideChildren = false,
        hasLeftChildren = false,
        hasRightChildren = false,
        hasDownChildren = false,
        hasInsideChildren = false;
    // Testing if there are children.
    if (data.children) {
      // Testing if there are any side children.
      hasChildren = true;
      hasLeftChildren = childNodes.left.length > 0;
      hasRightChildren = childNodes.right.length > 0;
      hasDownChildren = childNodes.down.length > 0;
      hasInsideChildren = childNodes.inside.length > 0;
      hasSideChildren = (hasLeftChildren || hasRightChildren) ? true : false;
      hasChildren = (hasSideChildren || hasDownChildren || hasInsideChildren) ? true : false;

      const insertDefocusTrigger = (classes) => {
        return (<div className={classes} onDoubleClick={() => { focusNode("defocus") }}></div>);
      }

      const insertSeqTrigger = () => {
        return (
          <div className="node-sequence-trigger"
            onClick={() => { focusNode(data) }}
            onMouseOver={this.handleNodeMouseOver}
            onMouseOut={this.handleNodeMouseOut}
            onMouseDown={() => {this.setState({nodeFocusing: true})}}>
          </div>
        );
      }

      // Node Children Container template:
      const populateNodes = (nodes, container) => {
        return (
          <div className={`node-${container ? container : "children"}-container`}>
            {container !== "sequence" ? insertDefocusTrigger("node-children-container-defocus-trigger") : insertSeqTrigger()}
            {nodes.map((childNode, index) => <NodeWrapper
              key={childNode.id}
              readOnly={readOnly}
              focusNode={focusNode}
              hoverNodeId={hoverNodeId}
              hoverNode={hoverNode}
              fetchAltParse={fetchAltParse}
              togglePane={togglePane}
              selectedNodeId={selectedNodeId}
              styles={styles}
              directionalChildIndex={index}
              isSingleSegment={isSingleSegment}
              loading={loading}
              positions={positions}
              linkLabels={linkLabels}
              parentId={data.id}
              data={childNode}
              layout={layout}
              text={text}
              seqType={seqType}
              depth={depth + 1} />)}
          </div>
        )
      }

      // Side and Down Children template:
      const populateDirectionalChildren = (direction, children) => {
        if (children.length > 0) {
          // Down Children:
          if (direction === "down") {
            return (
              <div className="ft__tr">
                {hasLeftChildren ? insertDefocusTrigger("ft__tr__td ft--left-placeholder") : null}
                <div className="ft__tr__td ft--middle-children">
                  {populateNodes(children)}
                </div>
                {hasRightChildren ? insertDefocusTrigger("ft__tr__td ft--right-placeholder") : null}
              </div>
            );
          } else if (direction === "left" || direction === "right") {
            // Side Children:
            return (
              <div className={`ft__tr__td ft--${direction}-children`}>
                {insertDefocusTrigger("node-children-container-defocus-trigger")}
                {populateNodes(children)}
              </div>
            );
          }
        } else {
          return null;
        }
      }

      // Outputting sets of each type of children.
      if (layout === "canonical" || (layout === "default" && !hasSideChildren && !hasInsideChildren)) {
        canonicalChildren = populateNodes(data.children);
      } else if (layout === "default" && hasInsideChildren && !hasSideChildren && childNodes.down.length > 0) {
        insideChildren = populateNodes(childNodes.inside, "sequence");
        canonicalChildren = populateNodes(childNodes.down);
      } else if (layout === "default") {
        leftChildren = populateDirectionalChildren("left", childNodes.left);
        rightChildren = populateDirectionalChildren("right", childNodes.right);
        downChildren = populateDirectionalChildren("down", childNodes.down);
        insideChildren = populateNodes(childNodes.inside, "sequence");
      }
    }

    // Determining collapsability and node treatment depending on nesting level.
    let isRoot = !isSingleSegment && depth === 0;
    let isEventRoot = (!isSingleSegment && depth === 1) || (isSingleSegment && depth === 0);
    let dataCollapsable = hasChildren && depth > 0 && !isEventRoot;

    // Setting value of link position
    let dataPos = "";

    if (data.link) {
      // If a link position is not explicitly set, default to "down".
      if (positions[data.link]) {
        dataPos = positions[data.link];
      } else {
        dataPos = "down";
      }
    }

    if ((!isSingleSegment && depth === 1) || (isSingleSegment && depth === 0)) {
      dataPos = "";
    }

    const isCollapsed = !expandedNodeIds.has(data.id);
    const eventSeqChild = data.kind === "event" && dataPos === "inside";
    const encapsulated = (dataPos === "left" || dataPos === "right") && hasSideChildren;
    const notFirstInsideChild = !(data.id !== undefined && dataPos === "inside" && directionalChildIndex === 0);
    const ftCollapsed = isCollapsed && (hasSideChildren || hasDownChildren) && !isRoot && !isEventRoot;

    // ftConditionalClasses builds dynamic class lists for .ft blocks:
    const ftConditionalClasses = classNames({
      "ft--event": data.kind === "event",
      "ft--seq": hasInsideChildren && hasSideChildren,
      "ft--root-event": isEventRoot,
      "ft--encapsulated": encapsulated,
      "ft--event-seq-child": eventSeqChild,
      "ft--no-left-children": hasSideChildren && !hasLeftChildren,
      "ft--no-right-children": hasSideChildren && !hasRightChildren,
      "node-container--collapsed": ftCollapsed,
      "node-container--expanded": !ftCollapsed,
      "node-container--active": active !== null && hasSideChildren,
      "node-container--toggle-ready": active === "toggle-ready",
    });

    const nodeContent = (
      <div className={`ft ${ftConditionalClasses}`}
        data-has-children={hasChildren}>
        <div className="ft__tr">
          {leftChildren}
          <MiddleParent
            readOnly={readOnly}
            depth={depth}
            directionalChildIndex={directionalChildIndex}
            layout={layout}
            positions={positions}
            linkLabels={linkLabels}
            data={data}
            parentId={parentId}
            hasChildren={hasChildren}
            styles={styles}
            active={active}
            focused={focused}
            collapsed={isCollapsed}
            selectedNodeId={selectedNodeId}
            hoverNodeId={hoverNodeId}
            nodeFocusing={nodeFocusing}
            canonicalChildren={canonicalChildren}
            dataCollapsable={dataCollapsable}
            rollups={rollups}
            isRoot={isRoot}
            encapsulated={encapsulated}
            eventSeqChild={eventSeqChild}
            notFirstInsideChild={notFirstInsideChild}
            isSingleSegment={isSingleSegment}
            text={text}
            dataPos={dataPos}
            togglePane={togglePane}
            isEventRoot={isEventRoot}
            onUiMouseOver={() => {this.setState({active: "toggle-ready"})}}
            onPnMouseOver={() => {this.setState({active: "hover"})}}
            onUiMouseOut={() => {this.setState({active: null})}}
            onPnMouseOut={() => {this.setState({active: null})}}
            onMouseDown={() => {this.setState({nodeFocusing: true})}}
            onMouseOver={this.handleNodeMouseOver}
            onMouseOut={this.handleNodeMouseOut}
            onMouseUp={this.handleNodeMouseUp}
            onUiMouseUp={this.handleUiToggleMouseUp}
            onPnMouseUp={this.handlePnToggleMouseUp}
            insideChildren={insideChildren}
            hasInsideChildren={hasInsideChildren}
            hasSideChildren={hasSideChildren}
            hasDownChildren={hasDownChildren}
            seqType={seqType} />
          {rightChildren}
        </div>
        {downChildren}
      </div>
    );

    const nodeContentStructure = encapsulated || eventSeqChild ? (
        <div
          className={`encapsulated ${eventSeqChild ? "event-seq-child" : ""} ${!isCollapsed && hasChildren ? "event-seq-child--expanded" : ""}`}
          data-pos={dataPos}>
          {(eventSeqChild && notFirstInsideChild) || (encapsulated && dataPos === "right") ? (
              <Link link={data.link} dataPos={dataPos} layout={layout} linkLabels={linkLabels} id={data.id} />
            ) : null}
          {nodeContent}
          {!eventSeqChild && dataPos === "left" ? (
              <Link link={data.link} dataPos={dataPos} layout={layout} linkLabels={linkLabels} id={data.id} />
            ) : null}
        </div>
      ) : nodeContent;

    return nodeContentStructure;
  }
}

Node.propTypes = {
  readOnly: PropTypes.bool,
  styles: PropTypes.object.isRequired,
  positions: PropTypes.object.isRequired,
  linkLabels: PropTypes.object.isRequired,
  data: PropTypes.shape({
    attributes: PropTypes.arrayOf(PropTypes.string.isRequired),
    children: PropTypes.arrayOf(PropTypes.object.isRequired),
    link: PropTypes.string,
    id: PropTypes.string,
  }),
  depth: PropTypes.number.isRequired,
  layout: PropTypes.string,
  text: PropTypes.string,
  parentId: PropTypes.string,
  selectedNodeId: PropTypes.string,
  hoverNodeId: PropTypes.string,
  isSingleSegment: PropTypes.bool,
  focusNode: PropTypes.func,
  hoverNode: PropTypes.func,
  fetchAltParse: PropTypes.func,
  togglePane: PropTypes.func,
  directionalChildIndex: PropTypes.number,
  loading: PropTypes.bool,
  expandedNodeIds: PropTypes.instanceOf(Immutable.Set).isRequired,
  toggleNode: PropTypes.func.isRequired,
  expandNode: PropTypes.func.isRequired,
}

const mapStateToProps = ({ ui }) => ({
  expandedNodeIds: ui.expandedNodeIds,
});

// When Node is called recursively, it is using the local definition of the component and not the
// exported, "wrapped with connect" definition, which is a higher-ordered component that has been
// decorated with redux store state. The fix is to assign the wrapped version of Node to a new
// variable here, export that, and call it when we recurse.
const NodeWrapper = connect(mapStateToProps, { expandNode, toggleNode })(Node);

export default NodeWrapper;
