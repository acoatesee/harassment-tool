import React from 'react';

const MultipleChoiceAnswerOption = (props) => (
  <li>
    <label tabIndex="0" onKeyDown={(e) => { if(e.keyCode === 13) { props.onAnswerSelected({target: {value: props.answerContent, name: props.name}}) } } }>
      <input
        type="radio"
        name={props.name}
        value={props.answerContent}
        onChange={props.onAnswerSelected}
        checked={props.checked}
      />
      {props.answerContent}
    </label>
  </li>
);

export default MultipleChoiceAnswerOption;
