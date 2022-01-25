import React from 'react';
import PropTypes from 'prop-types';
import '../question-text.css';
import './info-input.css';

class InfoQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue
    }
    this.onChange = this.onChange.bind(this);
  }

  getType() {
    return this.props.type === undefined ? 'info' : this.props.type;
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

      <div className="status-image-container"><img className="status-image" src="red-flag.png" alt="" /></div>
        <p className={"question-text " + this.checkForInvalidClass()}>{this.props.question}{this.createIcon()}</p>
        { this.createExplanation() }
        { this.createDollarSign() }
      </React.Fragment>
    );
  }
}

InfoQuestion.defaultProps = {
  initialValue: ""
}

InfoQuestion.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  explanation: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  initialValue: PropTypes.string,
  icon: PropTypes.string
}

export default InfoQuestion;
