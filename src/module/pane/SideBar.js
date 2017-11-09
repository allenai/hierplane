import React, { PropTypes } from 'react';
import NodeProperties from './NodeProperties.js';
import AltParseNav from './AltParseNav.js';
import StrRep from './StrRep.js';
import PanePanel from './PanePanel.js';
import PaneToggle from './PaneToggle.js';
import PaneHandler from './PaneHandler.js';
import ReactDOM from 'react-dom';

class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      defaultWidth: 400,
      mode: "autosnap",
      handlerStartX: null,
      sideBarStartWidth: null,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  componentDidMount() {
    this.setSideBarWidth(this.state.defaultWidth);
  }

  setSideBarWidth(width) {
    ReactDOM.findDOMNode(this.refs.sideBar).style.width = width + 'px';
  }

  handleMouseDown(e) {
    this.setState({
      mode: "moving",
      handlerStartX: e.clientX,
      sideBarStartWidth: ReactDOM.findDOMNode(this.refs.sideBar).getBoundingClientRect().width,
    });
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(e) {
    let newWidth;
    if (this.state.mode === "moving") {
      newWidth = (this.state.sideBarStartWidth - e.clientX + this.state.handlerStartX);
      this.setSideBarWidth(this.state.width);
    }
    this.setState({
      width: newWidth,
    });
  }

  handleMouseUp() {
    this.setState({
      mode: "autosnap",
    });
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleDoubleClick() {
    this.setSideBarWidth(this.state.defaultWidth);
  }

  render() {
    const { mode } = this.state;
    const { readOnly,
            text,
            selectedData,
            sideBarCollapsed,
            togglePane,
            fetchAltParse,
            loading } = this.props;

    const nodePropContent = (<NodeProperties selectedData={selectedData} text={text} />),
          altParseContent = (<AltParseNav selectedData={selectedData} fetchAltParse={fetchAltParse} loading={loading} readOnly={readOnly} />),
            strRepContent = (<StrRep selectedData={selectedData} />);

    let paneContent = null;

    if (selectedData !== null) {
      paneContent = (
        <div className="pane__panels">
          <PanePanel panelHeader="Node Properties" panelContent={nodePropContent} padded={true} />
          <PanePanel panelHeader="Alternate Parses" panelContent={altParseContent} padded={true} />
          <PanePanel panelHeader="String Representation" panelContent={strRepContent} padded={false} />
        </div>
      );
    } else {
      paneContent = (
        <div className="pane__empty"><span>Click a node to focus it and<br />inspect its properties.</span></div>
      );
    }

    return (
      <div id="sidebar" ref="sideBar" className={`pane pane--right
          ${(mode === "autosnap") ? "pane--autosnap" : ""}
          ${(mode === "moving") ? "pane--moving" : ""}
          ${(sideBarCollapsed) ? "pane--collapsed" : ""}`}>
        <PaneHandler
          onMouseDown={this.handleMouseDown}
          onDoubleClick={this.handleDoubleClick}
          direction = {"vertical"}/>
        {paneContent}
        <PaneToggle
          icon={"close"}
          mode={"close"}
          sideBarCollapsed={sideBarCollapsed}
          togglePane={togglePane} />
      </div>
    );
  }
}

SideBar.propTypes = {
  readOnly: PropTypes.bool,
  selectedData: PropTypes.object,
  text: PropTypes.string,
  sideBarCollapsed: PropTypes.bool,
  togglePane: PropTypes.func,
  fetchAltParse: PropTypes.func,
  loading: PropTypes.bool,
}

export default SideBar;
