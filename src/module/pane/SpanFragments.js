import PropTypes from 'prop-types';
import React from 'react';

class SpanFragments extends React.Component {
  render() {
    const { selectedData, text } = this.props;

    function getFragmentData({ alternateParseInfo }) {
      return alternateParseInfo && alternateParseInfo.spanAnnotations ? alternateParseInfo.spanAnnotations : null;
    }

    const fragmentData = getFragmentData(selectedData);

    return (
      <div className="pane__fragments">
        <div className="pane__fragments__nowrap-container">
          <div className="pane__fragments__nowrap-container__truncation-container">
            {fragmentData ? fragmentData.map((item) => (
              <span className={`fragment fragment--${item.spanType}`} key={`${item.lo}-${item.hi}`}>
                <span className="fragment__type">{item.spanType === "ignored" ? "ignr." : item.spanType}</span>
                <span className="fragment__text">{text.slice(item.lo, item.hi)}</span>
              </span>
            )) : (
              <div className="pane__alt-parse__empty"><span>No span fragments were served.</span></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

SpanFragments.propTypes = {
  selectedData: PropTypes.object,
  text: PropTypes.string,
}

export default SpanFragments;
