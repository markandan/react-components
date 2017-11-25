import React from 'react';
import PropTypes from 'prop-types';

class SimpleDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
      filteredValues: [...props.values],
      isOpen: false
    };
    this.renderOptions = this.renderOptions.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  renderOptions() {
    let values = this.props.values;
    let valuesList = [];
    let valueStr = "", labelStr = "";
    values.map((value, index) => {
      valueStr = (typeof value === "string") ? value : value.value;
      labelStr = (typeof value === "string") ? value : value.label;
      valuesList.push(<li data-value={valueStr} key={valueStr} onClick={()=> {
        this.onOptionChange(index);
      }} >{labelStr}</li>);
    });
    return valuesList;
  }

  toggleOptions() {
    this.setState({isOpen: !this.state.isOpen});
  }

  onOptionChange(index) {
    this.setState({selectedIndex: index, isOpen: false}, ()=> {
      if (this.props.onChangeHandler) {
        this.props.onChangeHandler(this.state.selectedIndex);
      }
    });
  }
  render() {
    let props = this.props;
    let className = (this.state.isOpen) ? "rc-dropdown open" : "rc-dropdown";
    return (
      <div className={className}>
        <div className="selectedValue" onClick={this.toggleOptions}>
          {(this.state.selectedIndex >= 0) ? props.values[this.state.selectedIndex].label : ""}
        </div>
        <ul className="rc-dropdown-options">
          {this.renderOptions()}
        </ul>
      </div>
    );
  }
}

SimpleDropdown.propTypes = {
  values: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  errorMsg: PropTypes.string,
  autoComplete: PropTypes.bool
};

export default SimpleDropdown;
