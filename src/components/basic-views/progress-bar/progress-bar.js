import React from 'react';
import './progress-bar.css';

class ProgressBar extends React.PureComponent {
  render() {
    return (
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{width: `${this.props.percentage}%`}}></div>
      </div>
    );
  }
}

export default ProgressBar;
