import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash';
import './Dropdown.scss';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
      filteredValues: [...props.values],
      isOpen: false,
      inputValue: this.getInputValue(props.selectedIndex, props.values)
    };
    this.renderOptions = this.renderOptions.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.openOptions = this.openOptions.bind(this);
    this.closeOptions = this.closeOptions.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.clearAllSelection = this.clearAllSelection.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentWillReceiveProps (newProps) {
   if (newProps.selectedIndex && newProps.selectedIndex !== this.state.selectedIndex) {
     this.setState({selectedIndex: newProps.selectedIndex, inputValue: this.getInputValue(newProps.selectedIndex, newProps.values)})
   }
   if (isEqual(newProps.values, this.props.values)) {
     this.setState({filteredValues: [...newProps.values]})
   }
 }
 getInputValue (selectedIndex, values) {
   if (selectedIndex >= 0) {
    return (typeof values[0] === "string" ? values[selectedIndex] : values[selectedIndex].label);
   }
   return "";
 }
  renderOptions() {
    let values = this.state.filteredValues;
    let valuesList = [];
    let valueStr = "", labelStr = "";
    if (!values.length) {
      return (<div className='rc-error'>{this.props.noResultsTxt}</div>);
    }
    values.map((value, index) => {
      valueStr = (typeof value === "string") ? value : value.value;
      labelStr = (typeof value === "string") ? value : value.label;
      valuesList.push(<div className="rc-option" data-value={valueStr} key={valueStr} onClick={
         () => {
           this.onOptionChange(value);
        }
      } >{labelStr}</div>);
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
  onOptionChange(value) {
    let props = this.props;
    let selectedIndex = (typeof value =="string") ? props.values.findIndex(value) : props.values.findIndex((element) => element.value === value.value && element.label == value.label);

    this.setState({selectedIndex, isOpen: false, inputValue: this.getInputValue(selectedIndex, props.values)}, ()=> {
      if (props.onChangeHandler) {
        props.onChangeHandler(this.state.selectedIndex);
      }
    });
  }
  handleFocus(event) {
    event.target.select();
    this.handleTextChange(event);
  }
  handleTextChange(event) {
    let keyedValue = event.target.value.toLowerCase();
    let filteredValues = this.props.values.filter((value) => {
      return ((typeof value === "string") ? value.toLowerCase().indexOf(keyedValue) > -1 : value["label"].toLowerCase().indexOf(keyedValue) > -1);
    });
    this.setState({filteredValues, inputValue: event.target.value});
  }
  clearAllSelection() {
    this.setState({selectedIndex: -1, inputValue: "", filteredValues: [...this.props.values]});
  }
  render() {
    let {props, state} = this;
    let className = (state.isOpen) ? "rc-dropdown open" : "rc-dropdown";
    className = (props.className) ? `${className} ${props.className}`  : className;
    return (
      <div className={className}>
        <div className="rc-selected-value"  onClick={this.toggleOptions}>
          <input type="text" value={state.inputValue} className="rc-txt-input"
          placeholder={props.placeholderTxt} onFocus={this.handleFocus}
          onChange={this.handleTextChange}/>
        </div>
        {(state.selectedIndex >= 0) ? <span className="rc-clear-all-selection" onClick={this.clearAllSelection}>×</span> : "" }
        <div className="rc-dropdown-options">
          {this.renderOptions()}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  values: PropTypes.array.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  autoComplete: PropTypes.bool,
  className: PropTypes.string,
  placeholderTxt: PropTypes.string,
  noResultsTxt: PropTypes.string
};

Dropdown.defaultProps = {
  autoComplete: true,
  className: "",
  placeholderTxt: "Search...",
  noResultsTxt: "No Results Found"
};
export default Dropdown;
