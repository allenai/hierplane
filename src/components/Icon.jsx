import React, { PropTypes } from 'react';

class Icon extends React.Component {
  render() {
    const { symbol, wrapperClass } = this.props;

    return (
      <svg className={`icon ${wrapperClass}`}>
        <use xlinkHref={`#icon__${symbol}`} />
      </svg>
    );
  }
}

Icon.propTypes = {
  wrapperClass: PropTypes.string,
  symbol: PropTypes.string,
}

export default Icon;
