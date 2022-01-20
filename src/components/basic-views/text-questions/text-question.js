import React from 'react';
import PropTypes from 'prop-types';
import '../question-text.css';
import './text-input.css';

class TextQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue
    }
    this.onChange = this.onChange.bind(this);
  }

  getType() {
    return this.props.type === undefined ? 'text' : this.props.type;
  }

  checkForInvalidClass() {
    return this.props.invalid ? "invalid" : "";
  }

  createExplanation() {
    if (this.props.explanation !== undefined && this.props.explanation !== "") {
      return (<p className={"explanation-text " + this.checkForInvalidClass()}>{this.props.explanation}</p>);
    } else {
      return null;
    }
  }

  createTextField() {
    var myType = this.getType();
    if (myType === 'numeric') {
      myType = 'tel';
    }

    if (myType === 'paragraph') {
      return (<textarea name={this.props.name} onChange={this.onChange} className={"paragraph-input " + this.checkForInvalidClass()} value={this.state.value} />);
    } else {
      return (<input type={myType} name={this.props.name} onChange={this.onChange} className={"line-input " + this.checkForInvalidClass()} value={this.state.value} />);
    }
  }

  createDollarSign() {
    if (this.props.dollarSign) {
      return <span style={{marginRight: "8px"}}>$</span>;
    } else {
      return null;
    }
  }

  onChange(e) {
    const newValue = e.target.value;
    this.setState(prevState => ({
      value: newValue
    }));
    this.props.onChange(e);
  }

  createIcon() {
    if (this.props.icon !== undefined) {
      return <i className={this.props.icon + " question-icon"}></i>;
    }
  }

  render() {
    return (
      <React.Fragment>
        <p className={"question-text " + this.checkForInvalidClass()}>{this.props.question}{this.createIcon()}</p>
        { this.createExplanation() }
        { this.createDollarSign() }
        { this.createTextField() }
      </React.Fragment>
    );
  }
}

TextQuestion.defaultProps = {
  initialValue: ""
}

TextQuestion.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  explanation: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  initialValue: PropTypes.string,
  icon: PropTypes.string
}

export default TextQuestion;
