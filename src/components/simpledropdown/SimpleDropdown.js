import React from 'react';
import PropTypes from 'prop-types';

import "./SimpleDropdown.scss";

class SimpleDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
      filteredValues: [...props.values],
      isOpen: false,
      inputValue: (props.selectedIndex >= 0) ? props.values[props.selectedIndex].label : ""
    };
    this.renderOptions = this.renderOptions.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.openOptions = this.openOptions.bind(this);
    this.closeOptions = this.closeOptions.bind(this);
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
      valuesList.push(<li data-value={valueStr} key={valueStr} onClick={
         () => {
           this.onOptionChange(index);
        }
      } >{labelStr}</li>);
    });
    return valuesList;
  }

  toggleOptions() {
    this.setState({isOpen: !this.state.isOpen});
  }
  openOptions() {
    this.setState({isOpen: true});
  }
  closeOptions() {
    this.setState({isOpen: false});
  }
  onOptionChange(index) {
    this.setState({selectedIndex: index, isOpen: false, inputValue: this.props.values[index].label}, ()=> {
      if (this.props.onChangeHandler) {
        this.props.onChangeHandler(this.state.selectedIndex);
      }
    });
  }

  clearAllSelection() {
    this.setState({selectedIndex: -1, inputValue: ""});
  }
  render() {
    let {props, state} = this;
    let className = (state.isOpen) ? "rc-dropdown open" : "rc-dropdown";
    className = (props.className) ? `${className} ${props.className}`  : className;
    return (
      <div className={className}>
        <div className="rc-selected-value"  onClick={this.toggleOptions}>
          <input type="text" value={state.inputValue} className="rc-txt-input"
          placeholder={props.placeholderTxt}/>
        </div>
        {(state.selectedIndex >= 0) ? <span className="rc-clear-all-selection" onClick={this.clearAllSelection}>×</span> : "" }
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
  className: PropTypes.string,
  placeholderTxt: PropTypes.string
};

export default SimpleDropdown;
