import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import PassageSpan from './PassageSpan.js';
import Icon from './Icon.js';
import classNames from 'classnames/bind';

class Passage extends React.Component {
  constructor() {
    super();
    this.state = {
      passageActive: false,
      focused: false,
      autoFocus: null,
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleSpaceBar = this.handleSpaceBar.bind(this);
    this.handleEsc = this.handleEsc.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleSpaceBar);
  }

  componentDidUpdate() {
    this.handleEmpty();
  }

  handleEmpty() {
    if (this.props.emptyQuery === true) {
      switch (this.state.autoFocus) {
        case null:
          this.setState({
            autoFocus: true,
          });
          break;
        case true:
          this.handleFocus();
          this.setState({
            autoFocus: false,
          });
          break;
      }
    }
  }

  handleEsc(e) {
    if (e.keyCode === 27) {
      this.handleBlur();
    }
  }

  handleSpaceBar(e) {
    const { readOnly, loading } = this.props;

    if (!loading && !readOnly) {
      if (this.state.focused === false && e.keyCode === 32) {
        e.preventDefault();
        this.handleFocus();
      }
    }

    if (this.state.focused && e.key === 'Enter' && !readOnly) {
      this.handleBlur();
    }
  }

  handleFocus() {
    this.setState({
      focused: true,
    });
    ReactDOM.findDOMNode(this.refs.passageInput).focus();
    this.props.focusNode("defocus");
  }

  handleBlur() {
    if (this.props.emptyQuery === true) {
      this.handleFocus();
    } else {
      this.setState({
        focused: false,
      });
      ReactDOM.findDOMNode(this.refs.passageInput).blur();
    }
  }

  handleMouseOver() {
    this.setState({
      passageActive: true,
    });
  }

  handleMouseOut() {
    this.setState({
      passageActive: false,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleSpaceBar);
  }

  render() {

    const { focused, passageActive } = this.state;
    const { readOnly,
            text,
            inputText,
            onKeyPress,
            onChange,
            loading,
            data,
            styles,
            selectedNodeId,
            hoverNodeId,
            hoverNode,
            focusNode,
            errorState } = this.props;

    const passageConditionalClasses = classNames({
      "passage--editing": focused,
      "passage--active": passageActive,
      "passage--loading": loading,
    });

    return (
      <div id="passage" className={passageConditionalClasses}>
        <div className="passage__focus-trigger"
          onDoubleClick={!readOnly ? this.handleFocus : () => {}}></div>
        {!readOnly ? (
          <textarea
            ref="passageInput"
            rows="1"
            onBlur={this.handleBlur}
            onKeyPress={onKeyPress}
            onKeyUp={this.handleEsc}
            readOnly={readOnly}
            onChange={onChange}
            disabled={loading}
            value={(inputText !== null ? inputText : "")} />
        ) : null}
        <p onDoubleClick={!readOnly ? this.handleFocus : () => {}}>
          <span className="passage__readonly">
            {loading || errorState ? text : (
              <PassageSpan
                text={text}
                data={data}
                styles={styles}
                selectedNodeId={selectedNodeId}
                hoverNodeId={hoverNodeId}
                hoverNode={hoverNode}
                focusNode={focusNode}
                depth={0} />
            )}
            {!readOnly ? (
              <span className="passage__edit"
                onClick={this.handleFocus}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                title="Edit query">
                <Icon symbol="edit" wrapperClass="passage__edit__trigger" />
              </span>
            ) : null}
          </span>
        </p>
        <div className="passage__loading-mask"></div>
      </div>
    );
  }
}

Passage.propTypes = {
  readOnly: PropTypes.bool,
  text: PropTypes.string.isRequired,
  inputText: PropTypes.string,
  onKeyPress: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  focusNode: PropTypes.func,
  loading: PropTypes.bool,
  emptyQuery: PropTypes.bool,
  errorState: PropTypes.bool,
  data: PropTypes.object,
  styles: PropTypes.object,
  selectedNodeId: PropTypes.string,
  hoverNodeId: PropTypes.string,
  hoverNode: PropTypes.func,
}

export default Passage;
