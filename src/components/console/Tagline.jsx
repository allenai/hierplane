import React from 'react';

// `Tagline` displays the tagline in `ConsoleHeader`.
class Tagline extends React.Component {
  render() {
    return (
      <p className="euclid-header__tagline">
        <strong>Euclid aims to solve SAT-style math questions</strong>
        <span>like the examples shown on the right.</span>
      </p>
    );
  }
}

export default Tagline;
