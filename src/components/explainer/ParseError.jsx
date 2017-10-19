import React from 'react';
import Icon from '../Icon.jsx';

// `Toolbar` displays the Euclid tool buttons.
class ParseError extends React.Component {
  render() {
    return (
      <div className="main-stage__error-container">
        <div className="parse-error">
          <Icon symbol="error" wrapperClass="parse-error__icon" />
          <h1 className="parse-error__primary">
            <span>Parsing error</span>
          </h1>
          <p className="parse-error__secondary">
            <strong>No parse trees were returned in the JSON.</strong>
          </p>
          <p className="parse-error__tertiary">
            <span>Press space bar to enter a new query.</span>
          </p>
        </div>
      </div>
    );
  }
}

export default ParseError;
