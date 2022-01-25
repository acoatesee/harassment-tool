import React from 'react';
import InfoQuestion from './info-question.js';

class InfoQuestions extends React.Component {

  render() {
    return (
      <React.Fragment>
        {
          this.props.questions.map(item => (
            <label key={item.name+"Key"}>
              <InfoQuestion name={item.name} question={item.question} onChange={this.props.onChange} explanation={item.explanation}/>
            </label>
          ))
        }
      </React.Fragment>
    );
  }
}

export default InfoQuestions;
