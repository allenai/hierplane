import React, { PropTypes } from 'react';
import BrowserNote from './BrowserNote.jsx';
import Tagline from './console/Tagline.jsx';
import Toolbar from './explainer/Toolbar.jsx';
import Icon from './Icon.jsx';

// `EuclidHeader` displays the static header content: logo, tagline and (if not Chrome) `BrowserNote`.
class EuclidHeader extends React.Component {
  render() {
    const { explainerHeader,
            jsonUrl,
            disableJsonLink,
            jsonData,
            selectedData,
            serverEndPoint } = this.props;

    return (
      <div className="euclid-header">
        {!window.chrome && <BrowserNote />}
        <div className="euclid-header__logo-tagline-container">
          <a className="euclid-header__logo-container" href="http://euclid.allenai.org">
            <h1 className="euclid-header__logo">
              <Icon symbol="logo-euclid" wrapperClass="euclid-header__logo__glyph" />
              <span className="euclid-header__logo__label">Euclid</span>
            </h1>
          </a>
          {!explainerHeader ? <Tagline /> : null}
        </div>
        {explainerHeader ? (
            <Toolbar
              jsonUrl={jsonUrl}
              disableJsonLink={disableJsonLink}
              jsonData={jsonData}
              selectedData={selectedData}
              serverEndPoint={serverEndPoint} />
          ) : null}
      </div>
    );
  }
}

EuclidHeader.propTypes = {
  explainerHeader: React.PropTypes.bool.isRequired,
  jsonUrl: React.PropTypes.string,
  disableJsonLink: PropTypes.bool,
  jsonData: PropTypes.object,
  selectedData: PropTypes.object,
  serverEndPoint: PropTypes.bool,
}

export default EuclidHeader;
