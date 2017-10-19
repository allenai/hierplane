import React from 'react';

// `BrowserNote` displays a "Best viewed in Chrome..." message when not in Chrome.
export default class BrowserNote extends React.Component {
  render() {
    return (
      <div className="toast">
        <div className="toast__content">
          <span className="toast__content__label">Best viewed in Chrome browser for desktop.</span>
        </div>
      </div>
    );
  }
}
