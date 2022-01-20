import React from 'react';
import Dropdown from './dropdown.js';

class Dropdowns extends React.Component {

  render() {
    return (
      <React.Fragment>
        {
          this.props.items.map(item => (
            <Dropdown key={item.name+"Key"} name={item.name} question={item.question} options={item.options} onChange={this.props.onChange} blankFirst={this.props.blankFirst} explanation={item.explanation} invalid={this.props.invalid.includes(item.name)} />
          ))
        }
      </React.Fragment>
    );
  }
}

Dropdowns.defaultProps = {
  invalid: []
};

export default Dropdowns;
