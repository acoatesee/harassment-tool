import React from 'react';

class StartingInfo extends React.PureComponent {
  render() {
    if (!this.props.show) {
      return null;
    } else {
      return (
        <React.Fragment>
          { this.props.canFinishEarly ? <p>The number of questions left may decrease depending on your answers.</p> : null}
          <p>We do not store your personal data. Do not navigate away from this tool or you will lose all your progress.</p>
          { this.props.time != null ? <p>Tool takes approximately {this.props.time} minutes to use.</p> : null }
        </React.Fragment>
      );
    }
  }
}

export default StartingInfo;
