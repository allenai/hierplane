import PropTypes from 'prop-types';
import React from 'react';
import LinkSvg from './LinkSvg.js';

class Link extends React.Component {
  render() {
    const { link, dataPos, layout, linkLabels, id } = this.props;

    let displayLink = null;

    // If a linkNameToLabel mapping exists, display that instead of node object's link value.
    if (linkLabels[link]) {
      displayLink = linkLabels[link];
    } else {
      displayLink = link;
    }

    const linkData = {
      left: {
        before: {
          capPos: "top",
          viewBox: "0 0 21 14",
          fillPoints: "21.3,14 0.5,14 0.5,13.7 21.3,0.4",
          strokePoints: "0.5,14 0.5,13.7 21.3,0.4",
        },
        after: {
          capPos: "bottom",
          viewBox: "0 0 21 14",
          fillPoints: "21.3,-0.1 0.5,-0.1 0.5,0.3 21.3,13.6",
          strokePoints: "0.5,0 0.5,0.3 21.3,13.6",
        },
      },
      right: {
        before: {
          capPos: "top",
          viewBox: "0 0 21 14",
          fillPoints: "-0.3,14 20.5,14 20.5,13.7 -0.3,0.4",
          strokePoints: "20.5,14 20.5,13.7 -0.3,0.4",
        },
        after: {
          capPos: "bottom",
          viewBox: "0 0 21 14",
          fillPoints: "-0.3,-0.1 20.5,-0.1 20.5,0.3 -0.3,13.6",
          strokePoints: "20.5,0 20.5,0.3 -0.3,13.6",
        },
      },
      inside: {
        before: {
          capPos: "top",
          viewBox: "0 0 34 11",
          fillPoints: "17,1.2 0.5,10.7 0.5,11 33.5,11 33.5,10.7",
          strokePoints: "33.5,11 33.5,10.7 17,1.2 0.5,10.7 0.5,11",
        },
        after: {
          capPos: "bottom",
          viewBox: "0 0 34 11",
          fillPoints: "17,9.8 33.5,0.3 33.5,0 0.5,0 0.5,0.3",
          strokePoints: "0.5,0 0.5,0.3 17,9.8 33.5,0.3 33.5,0",
        },
      },
      down: {
        before: {
          capPos: "left",
          viewBox: "0 0 14 21",
          fillPoints: "14.1,-0.3 14.1,20.5 13.7,20.5 0.4,-0.3",
          strokePoints: "14.1,20.5 13.7,20.5 0.4,-0.3",
        },
        after: {
          capPos: "right",
          viewBox: "0 0 14 21",
          fillPoints: "-0.1,-0.3 -0.1,20.5 0.3,20.5 13.6,-0.3",
          strokePoints: "0,20.5 0.3,20.5 13.6,-0.3",
        },
      },
    }

    return (
      <div className="node__word__link">
        <div className="node__word__link__tab">
          <LinkSvg {...linkData[layout !== "canonical" ? dataPos : "down"].before} />
          <div className="node__word__link__label">
            <span id={"node-" + id + "-link"}>{displayLink}</span>
          </div>
          <LinkSvg {...linkData[layout !== "canonical" ? dataPos : "down"].after} />
        </div>
      </div>
    );
  }
}

Link.propTypes = {
  link: PropTypes.string,
  id: PropTypes.string,
  dataPos: PropTypes.string,
  layout: PropTypes.string,
  linkLabels: PropTypes.object,
}

export default Link;
