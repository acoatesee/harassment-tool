import React from 'react';
import TextQuestion from './text-question.js';

class TextQuestions extends React.Component {

  render() {
    return (
      <React.Fragment>
        {
          this.props.questions.map(item => (
            <label key={item.name+"Key"}>
              <TextQuestion name={item.name} question={item.question} onChange={this.props.onChange} explanation={item.explanation} invalid={this.props.invalid.includes(item.name)} />
            </label>
          ))
        }
      </React.Fragment>
    );
  }
}

export default TextQuestions;
