import React, { PropTypes } from 'react';

class StrRep extends React.Component {
  handleFocus() {
    // Make sure any selected text on the page is de-selected when textarea is focused.
    if (document.selection) {
      document.selection.empty();
    } else if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  }

  render() {
    const { selectedData } = this.props;

    let parsedStr = null;
    if (selectedData.stringRepresentation) {
      parsedStr = (selectedData.stringRepresentation);
    } else {
      parsedStr = "";
    }

    return (
      <div className="code">
        <textarea onFocus={() => this.handleFocus()} className="code__content" readOnly="readonly" value={parsedStr} />
      </div>
    );
  }
}

StrRep.propTypes = {
  selectedData: PropTypes.object,
}

export default StrRep;
