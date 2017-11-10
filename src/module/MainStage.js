import EmptyTree from './EmptyTree.js';
import Icon from './Icon.js';
import Node from './node/Node.js';
import ParseError from './ParseError.js';
import classNames from 'classnames/bind';

import { isSingleSegment } from './helpers';

import React, { PropTypes } from 'react';

class MainStage extends React.Component {
  constructor() {
    super();
    this.state = {
      rendered: false,
    };
  }

  componentDidUpdate() {
    this.state = {
      rendered: true,
    };
  }

  render() {
    const { rendered } = this.state;
    const { readOnly,
            styles,
            positions,
            linkLabels,
            data,
            layout,
            text,
            selectedNodeId,
            hoverNodeId,
            focusNode,
            hoverNode,
            fetchAltParse,
            togglePane,
            loading,
            firstLoad,
            emptyQuery,
            errorState } = this.props;

    let mainsStageContent = null;

    if (emptyQuery) {
      mainsStageContent = (<EmptyTree />);
    } else {
      if (data && !errorState) {
        // TODO: remove readOnly, execute componentDidUpdate automatically when readOnly is true
        mainsStageContent = (
          <div className={`main-stage__tree-container ${rendered || readOnly ? "main-stage--rendered" : ""}`}>
            <div className="main-stage__defocus-trigger" onDoubleClick={() => { focusNode("defocus") }}></div>
            <Node
              readOnly={readOnly}
              selectedNodeId={selectedNodeId}
              focusNode={focusNode}
              hoverNodeId={hoverNodeId}
              hoverNode={hoverNode}
              fetchAltParse={fetchAltParse}
              togglePane={togglePane}
              styles={styles}
              positions={positions}
              linkLabels={linkLabels}
              loading={loading}
              data={data}
              isSingleSegment={isSingleSegment(data.nodeType)}
              layout={layout}
              depth={0}
              directionalChildIndex={0}
              text={text} />
          </div>
        );
      } else {
        mainsStageContent = (<ParseError />);
      }
    }

    // mainStageConditionalClasses builds dynamic class lists for #main-stage:
    const mainStageConditionalClasses = classNames({
      [`${layout}`]: true,
      "main-stage--loading": loading,
      "main-stage--fade-delay": !firstLoad && !emptyQuery,
    });

    return (
      <div id="main-stage" className={mainStageConditionalClasses}>
        {loading ? (
          <div className="main-stage__loading-mask">
            <div className="main-stage__loading-mask__spinbox">
              <Icon symbol="logo-euclid" wrapperClass="loader" />
            </div>
          </div>
        ) : null}
        <div className="main-stage__defocus-trigger" onDoubleClick={() => { focusNode("defocus") }}></div>
        {mainsStageContent}
      </div>
    );
  }
}

MainStage.propTypes = {
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
  layout: PropTypes.string,
  text: PropTypes.string,
  selectedNodeId: PropTypes.string,
  hoverNodeId: PropTypes.string,
  focusNode: PropTypes.func,
  hoverNode: PropTypes.func,
  fetchAltParse: PropTypes.func,
  togglePane: PropTypes.func,
  loading: PropTypes.bool,
  firstLoad: PropTypes.bool,
  emptyQuery: PropTypes.bool,
  errorState: PropTypes.bool,
}

export default MainStage;
