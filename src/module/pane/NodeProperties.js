import PropTypes from 'prop-types';
import React from 'react';

class NodeProperties extends React.Component {
  render() {
    const { selectedData, text } = this.props;

    const emptyProp = (
      <div className="meta-table-label">
        <span className="meta-table-label--empty">none</span>
      </div>
    );

    // charNodeRoot is the field in the JSON node object that contains its span's
    // lo and hi values that let the UI extract a phrase from the original query.
    const hasSpan = selectedData.hasOwnProperty("alternateParseInfo") && selectedData.alternateParseInfo.hasOwnProperty("charNodeRoot");
    let spanData = null;

    if (hasSpan) {
      const spanField = selectedData.alternateParseInfo.charNodeRoot;
      spanData = text.slice(spanField.charLo, spanField.charHi);
    }

    return (
      <table className="meta-table">
        <tbody>
          <tr>
            <th><span>Head Word:</span></th>
            <td>{selectedData.word ? (
                <div className="meta-table-label">
                  <span className="meta-table-label--hero">{selectedData.word}
                  </span>
                </div>
              ) : emptyProp}
            </td>
          </tr>
          <tr>
            <th><span>JSON ID:</span></th>
            <td><div className="meta-table-label"><span>{selectedData.id}</span></div></td>
          </tr>
          <tr className="meta-table__tr--section">
            <th><span>Kind:</span></th>
            <td>{(selectedData.nodeType) ? (
                <div className="meta-table-label">
                  <span>{selectedData.nodeType}</span>
                </div>
              ) : emptyProp}
            </td>
          </tr>
          <tr>
            <th><span>Link:</span></th>
            <td>{selectedData.link ? (
                <div className="meta-table-label">
                  <span className={selectedData.link !== "__TODO__" && selectedData.link !== "none" ? "" : "meta-table-label--empty"}>{selectedData.link}</span>
                </div>
              ) : emptyProp}
            </td>
          </tr>
          <tr>
            <th><span>Children:</span></th>
            <td>{selectedData.children.length > 0 ? (
                <div className="meta-table-label">
                  <span>{selectedData.children.length}</span>
                </div>
              ) : emptyProp}
            </td>
          </tr>
          <tr>
            <th><span>Attributes:</span></th>
            <td>{selectedData.attributes.length > 0 ? (
                <div className="meta-table-label">
                  <span>{selectedData.attributes.join(", ")}</span>
                </div>
              ) : emptyProp}
            </td>
          </tr>
          <tr>
            <th><span>Span:</span></th>
            <td>{hasSpan ? (
                <div className="meta-table-label" title={spanData}>
                  <span>{spanData}</span>
                </div>
              ) : emptyProp}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

NodeProperties.propTypes = {
  selectedData: PropTypes.object,
  text: PropTypes.string,
}

export default NodeProperties;
