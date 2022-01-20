import React from 'react';
import PropTypes from 'prop-types';
import './checkbox.css';

const Checkbox = ({ type = 'checkbox', answerOption, checked = false, onChange }) => (
  <React.Fragment>
      <input type={type} name={answerOption} checked={checked} onChange={onChange} value={answerOption} />
      <p className="checkbox-text">{answerOption}</p>
  </React.Fragment>
);

Checkbox.propTypes = {
  type: PropTypes.string,
  answerOption: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

export default Checkbox;
