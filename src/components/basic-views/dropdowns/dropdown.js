import React from 'react';
import PropTypes from 'prop-types';
import '../question-text.css';
import './dropdown.css';

const createOptions = (options, blankFirst) => {
  const optionComponents = options.map((optionText, index) =>
    <option value={optionText} key={index}>{optionText}</option>
  );

  if (blankFirst) {
    optionComponents.unshift(<option value={""} key={optionComponents.length} hidden disabled></option>)
  }
  return optionComponents;
}

function checkForInvalidClass(invalid) {
  return invalid ? "invalid" : "";
}

function createExplanation(explanation, invalid) {
  if (explanation !== undefined && explanation !== "") {
    return (<p className={"explanation-text " + checkForInvalidClass(invalid)}>{explanation}</p>);
  } else {
    return null;
  }
}

const Dropdown = ({ name, question, options, onChange, blankFirst, explanation, invalid }) => (
  <React.Fragment>
    <p className={"question-text " + checkForInvalidClass(invalid)}>{question}</p>
    { createExplanation(explanation, invalid) }
    <select name={name} size="1" onChange={onChange} defaultValue={blankFirst ? "" : options[0]}>
      { createOptions(options, blankFirst) }
    </select>
  </React.Fragment>
);

Dropdown.defaultProps = {
  blankFirst: false,
  invalid: false
};

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  blankFirst: PropTypes.bool,
  invalid: PropTypes.bool
}

export default Dropdown;
