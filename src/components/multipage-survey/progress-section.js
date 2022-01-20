import React from 'react';
import ProgressBar from '../basic-views/progress-bar/progress-bar.js';
import './progress-section.css';

class ProgressSection extends React.PureComponent {
  render() {
    if (this.props.questionNumber === 0) {
      return (
        <React.Fragment>
          <h3>{this.props.title}</h3>
        </React.Fragment>
      );
    } else {
      const percentage = (this.props.questionNumber / this.props.numberOfQuestions) * 100;
      return (
        <React.Fragment>
          <h3>{this.props.title}</h3>
          <p className="progress-question-number">Question {this.props.questionNumber} of {this.props.numberOfQuestions}</p>
          <ProgressBar percentage={percentage} />
        </React.Fragment>
      );
    }
  }
};

export default ProgressSection;
