import React, { PropTypes } from 'react';
import AltParseNavToggle from './AltParseNavToggle.js';

class AltParseNav extends React.Component {
  constructor() {
    super();
    this.state = {
      keyInteraction: "idle", // idle, prev, next
    };

    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);
    this.handleKeyInput = this.handleKeyInput.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('keyup', this.handleKeyup);
  }

  handleKeydown(e) {
    this.handleKeyInput(e, "down");
  }

  handleKeyup(e) {
    this.handleKeyInput(e, "up");
  }


  handleKeyInput(e, keyEvent) {
    const selectedData = this.props.selectedData;
    const altParseInfo = selectedData.alternateParseInfo;
    if (selectedData.hasOwnProperty("alternateParseInfo") && !this.props.readOnly && !this.props.loading) {
      if (e.keyCode === 219 && altParseInfo.hasOwnProperty("prevParse")) {
        if (keyEvent === "up") {
          this.props.fetchAltParse(selectedData, "prev");
        }
        this.setState({
          keyInteraction: keyEvent === "down" ? "prev" : "idle",
        });
      } else if (e.keyCode === 221 && altParseInfo.hasOwnProperty("nextParse")) {
        if (keyEvent === "up") {
          this.props.fetchAltParse(selectedData, "next");
        }
        this.setState({
          keyInteraction: keyEvent === "down" ? "next" : "idle",
        });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('keyup', this.handleKeyup);
  }

  render() {
    const { keyInteraction } = this.state;
    const { readOnly,
            selectedData,
            fetchAltParse,
            loading } = this.props;

    let altParseContent = null;
    let altParseInfoExists = selectedData.hasOwnProperty("alternateParseInfo") && selectedData.alternateParseInfo !== undefined;

    const altParseInfo = altParseInfoExists ? selectedData.alternateParseInfo : null;
    const hasPrevParse = altParseInfoExists && altParseInfo.hasOwnProperty("prevParse");
    const hasNextParse = altParseInfoExists && altParseInfo.hasOwnProperty("nextParse");

    const insertTrigger = (direction) => {
      const hasDirectionalParse = direction === "prev" ? hasPrevParse : hasNextParse;
      const disabled = altParseInfoExists && hasDirectionalParse && !loading && !readOnly ? false : true;

      return (
        <AltParseNavToggle
          direction={direction}
          keyInteraction={keyInteraction}
          fetchAltParse={fetchAltParse}
          disabled={disabled}
          loading={loading}
          selectedData={selectedData} />
      );
    }

    if (altParseInfoExists) {
      altParseContent = (
        <div className="pane__alt-parse">
          <div className="pane__alt-parse__meta">
            <table className="meta-table">
              <tbody>
                <tr>
                  <th >
                    <span>Current Parse:</span>
                  </th>
                  <td>
                    <div className="meta-table-label">
                      <span>
                        {altParseInfo.hasOwnProperty("currentParseIndex") ? (
                            <span>{altParseInfo.currentParseIndex + 1}</span>
                          ) : (
                            <span className="meta-table-label--empty">unknown</span>
                          )}
                        {altParseInfo.hasOwnProperty("numberOfParses") ? (
                            <span>
                              <span className="meta-table-label--empty">&nbsp;of&nbsp;</span>
                              <span className="meta-table-label--secondary">{altParseInfo.numberOfParses}</span>
                            </span>
                          ) : ("")}
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pane__alt-parse__nav">
            {insertTrigger("prev")}
            {insertTrigger("next")}
          </div>
        </div>
      );
    } else {
      altParseContent = (
        <div className="pane__alt-parse">
          <div className="pane__alt-parse__empty"><span>No alternate parse data was served.</span></div>
        </div>
      );
    }

    return altParseContent;
  }
}

AltParseNav.propTypes = {
  readOnly: PropTypes.bool,
  selectedData: PropTypes.object,
  fetchAltParse: PropTypes.func,
  loading: PropTypes.bool,
}

export default AltParseNav;
