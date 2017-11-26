import React from 'react';
import PropTypes from 'prop-types';

import "./SimpleDropdown.scss";

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
    this.clearAllSelection = this.clearAllSelection.bind(this);
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

  clearAllSelection() {
    this.setState({selectedIndex: -1});
  }
  render() {
    let props = this.props;
    let className = (this.state.isOpen) ? "rc-dropdown open" : "rc-dropdown";
    className = (this.props.className) ? `${className} ${this.props.className}`  : className;
    return (
      <div className={className}>
        <div className="selectedValue" onClick={this.toggleOptions}>
          {(this.state.selectedIndex >= 0) ? props.values[this.state.selectedIndex].label : ""}
        </div>
        {(this.state.selectedIndex >= 0) ? <span className="clearAllSelection" onClick={this.clearAllSelection}>×</span> : "" }
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
  autoComplete: PropTypes.bool,
  className: PropTypes.string
};

export default SimpleDropdown;
