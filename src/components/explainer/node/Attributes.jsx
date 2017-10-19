import React, { PropTypes } from 'react';

class Attributes extends React.Component {
  render() {
    const { attrs, id } = this.props;

    return (
      <div className="node__word__attrs">
        {attrs !== undefined && attrs.length > 0 ? attrs.map(attr => (
          <div key={attr} className="node__word__attrs__item"><span id={"node-" + id + "-attr-" + attr}>{attr}</span></div>
        )) : null}
      </div>
    );
  }
}

Attributes.propTypes = {
  attrs: PropTypes.array,
  id: PropTypes.string,
}

export default Attributes;
