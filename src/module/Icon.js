import PropTypes from 'prop-types';
import React from 'react';

// TODO (codeviking): This component is a duplicate of webui/webapp/app/components/Icon.jsx. When
// migrating hierplane to it's own dependency, I had to move this too. Eventually we should
// figure out a way tos hare these types of "common" components (or decide we're not going to,
// and remove this TODO).
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
