import React from 'react';
import Icon from './Icon.js';

// `Toolbar` displays the Euclid tool buttons.
class EmptyTree extends React.Component {
  render() {
    return (
      <div className="main-stage__error-container">
        <div className="parse-error">
          <Icon symbol="keyboard" wrapperClass="parse-error__icon" />
          <h1 className="parse-error__primary">
            <span>Enter your query above</span>
          </h1>
          <p className="parse-error__secondary">
            <strong>Press <span className="parse-error--key">enter</span> to parse.</strong>
          </p>
        </div>
      </div>
    );
  }
}

export default EmptyTree;
