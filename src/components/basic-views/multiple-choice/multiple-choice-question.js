import React from 'react';
import PropTypes from 'prop-types';
import MultipleChoiceAnswerOption from './multiple-choice-answer-option.js';
import './multiple-choice.css';
import '../question-text.css';

class MultipleChoiceQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      answerSelected: props.initialAnswer
    }

    this.createExplanation = this.createExplanation.bind(this);
    this.onAnswerSelected = this.onAnswerSelected.bind(this);
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
        <ul className={"multiple-choice-answer-options " + this.checkForInvalidClass()}>
          { this.props.answerOptions.map(this.createAnswerOptions, this) }
        </ul>
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
    const newAnswer = e.target.value;
    this.setState(prevState => ({
      answerSelected: newAnswer
    }));
    this.props.onAnswerSelected(e);
  }

  createAnswerOptions(answerOption, index) {
    // Name must be unique to each multiple choice question but consistent between the inputs within a question
    return (
      <MultipleChoiceAnswerOption
        key={answerOption}
        answerContent={answerOption}
        onAnswerSelected={this.onAnswerSelected}
        checked={this.state.answerSelected === answerOption}
        name={this.props.name}
      />
    );
  }
}

MultipleChoiceQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  answerOptions: PropTypes.array.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  initialAnswer: PropTypes.string,
  invalid: PropTypes.bool,
  icon: PropTypes.string
}

export default MultipleChoiceQuestion;
