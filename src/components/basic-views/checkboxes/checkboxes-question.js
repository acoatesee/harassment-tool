import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './checkbox.js';
import '../question-text.css';
import onlyUnique from './../../../utils/only-unique.js';

class CheckboxesQuestion extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        answersSelected: props.initialAnswers
      }

      this.createExplanation = this.createExplanation.bind(this);
      this.onAnswerSelected = this.onAnswerSelected.bind(this);
    }

    render() {
      return (
        <React.Fragment>
          <p className={"question-text " + this.checkForInvalidClass()}>{this.props.question}</p>
          { this.createExplanation() }
          <div className={this.checkForInvalidClass()}>
            { this.props.answerOptions.map(this.createAnswerOptions, this) }
          </div>
        </React.Fragment>
      );
    }

    createExplanation() {
      if (this.props.explanation !== undefined && this.props.explanation !== "") {
        return (<p className={"explanation-text " + this.checkForInvalidClass()}>{this.props.explanation}</p>);
      } else {
        return null;
      }
    }

    checkForInvalidClass() {
      return this.props.invalid ? "invalid" : "";
    }

    onAnswerSelected(e) {
      const isChecked = e.target.checked;
      const clicked = e.target.value;

      if (isChecked) {
        this.setState(prevState => ({
          answersSelected: prevState.answersSelected.concat(clicked).filter(onlyUnique)
        }));
      } else {
        this.setState(prevState => ({
          answersSelected: prevState.answersSelected.filter(item => item !== clicked)
        }));
      }

      this.props.onAnswerSelected(e);
    }

    createAnswerOptions(answerOption, index) {
      // Name must be unique to each checkbox question but consistent between the inputs within a question
      return (
        <div key={answerOption}>
          <label>
            <Checkbox
              key={answerOption}
              answerOption={answerOption}
              checked={this.state.answersSelected.includes(answerOption)}
              onChange={this.onAnswerSelected} />
          </label>
        </div>
      );
    }
}

CheckboxesQuestion.defaultProps = {
  initialAnswers: []
}

CheckboxesQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  initialAnswers: PropTypes.array,
  invalid: PropTypes.bool
}

export default CheckboxesQuestion;
