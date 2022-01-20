import React from 'react';
import PropTypes from 'prop-types';
import positiveIcon from './../../../images/icons/checkmark.svg';
import negativeIcon from './../../../images/icons/alert-octagon.svg';
import './alert.css'

const Alert = ({ text, positive }) => {
  if (text === '') {
    return null;
  } else {
    return (
      <div className={"alert "+pickAlertColour(positive)}>
        {pickAlertIcon(positive)}{text}
      </div>
    );
  }
};

const pickAlertColour = positive => {
  if (positive) {
    return "alert-green";
  } else {
    return "alert-red";
  }
}

const pickAlertIcon = positive => {
  if (positive) {
    return <img src={positiveIcon} style={{"marginBottom": "2px"}} className="alert-icon" alt="Success!" />;
  } else {
    return <img src={negativeIcon} className="alert-icon" alt="There was an error." />;
  }
}

Alert.defaultProps = {
  positive: false
}

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  positive: PropTypes.bool
}

export default Alert;
