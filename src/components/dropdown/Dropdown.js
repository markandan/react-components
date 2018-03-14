import React from 'react';
import PropTypes from 'prop-types';
import './Dropdown.scss';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
      filteredValues: [...props.values],
      isOpen: false,
      inputValue: this.getInputValue(props.selectedIndex, props.values),
    };
    this.renderOptions = this.renderOptions.bind(this);
    this.toggleOptions = this.toggleOptions.bind(this);
    this.openOptions = this.openOptions.bind(this);
    this.closeOptions = this.closeOptions.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.clearAllSelection = this.clearAllSelection.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.checkValueSelected = this.checkValueSelected.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.selectedIndex !== undefined && newProps.selectedIndex !== null && 
        newProps.selectedIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex: newProps.selectedIndex,
        inputValue: this.getInputValue(newProps.selectedIndex, newProps.values),
      });
    }
    this.setState({ filteredValues: [...newProps.values] });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false);
  }

  onOptionChange(value) {
    const { props } = this;
    const selectedIndex = (typeof value === 'string') ? props.values.findIndex(element => element === value) : props.values.findIndex(element => element.value === value.value && element.label === value.label);

    this.setState({
      selectedIndex,
      isOpen: false,
      inputValue: this.getInputValue(selectedIndex),
    }, () => {
      if (props.onChangeHandler) {
        props.onChangeHandler(this.state.selectedIndex);
      }
    });
  }

  getInputValue(selectedIndex, values = this.props.values) {
    if (selectedIndex >= 0) {
      return (typeof values[0] === 'string' ? values[selectedIndex] : values[selectedIndex].label);
    }
    return '';
  }

  handleDocumentClick(event) {
    if (this.dropDownNode && !this.dropDownNode.contains(event.target) && this.state.isOpen) {
      const inputValue = this.getInputValue(this.state.selectedIndex, this.props.values);
      this.setState({ isOpen: false, inputValue });
    }
  }

  toggleOptions() {
    this.setState({ isOpen: !this.state.isOpen });
  }
  openOptions() {
    this.setState({ isOpen: true });
  }
  closeOptions() {
    this.setState({ isOpen: false });
  }
  handleFocus(event) {
    event.target.select();
    this.handleTextChange(event);
  }
  handleTextChange(event) {
    const keyedValue = event.target.value.toLowerCase();
    const filteredValues = this.props.values.filter(value => ((typeof value === 'string') ? value.toLowerCase().indexOf(keyedValue) > -1 : value.label.toLowerCase().indexOf(keyedValue) > -1));
    this.setState({ filteredValues, inputValue: event.target.value });
  }
  clearAllSelection() {
    this.setState({
      selectedIndex: -1,
      inputValue: '',
      filteredValues: [...this.props.values],
    });
  }

  checkValueSelected(value) {
    const { props, state } = this;
    if (state.selectedIndex === -1) {
      return false;
    }
    return ((typeof value === 'string') ? props.values[state.selectedIndex] === value : (props.values[state.selectedIndex].value === value.value && props.values[state.selectedIndex].label === value.label));
  }

  renderOptions() {
    const values = this.state.filteredValues;
    const valuesList = [];
    let valueStr = '';
    let labelStr = '';
    if (!values.length) {
      return (<div className="rc-error">{this.props.noResultsTxt}</div>);
    }
    values.forEach((value) => {
      const optionType = (typeof value === 'string');
      valueStr = optionType ? value : value.value;
      labelStr = optionType ? value : value.label;
      let className = (!optionType && value.disabled) ? 'rc-option disabled' : 'rc-option';
      const isValueSelected = this.checkValueSelected(value);
      className = (isValueSelected) ? `${className} selected` : className;
      valuesList.push(<div
        className={className}
        data-value={valueStr}
        key={valueStr}
        role="presentation"
        onClick={
                 () => {
                   if (!value.disabled) {
                     this.onOptionChange(value);
                   }
                }
              }
      >{labelStr}
                      </div>);
    });

    return valuesList;
  }

  render() {
    const { props, state } = this;
    let className = (state.isOpen) ? 'rc-dropdown open' : 'rc-dropdown';
    className = (props.className) ? `${className} ${props.className}` : className;
    className = (props.disabled) ? `${className} disabled` : className;
    const inputClassName = (props.disabled) ? 'rc-txt-input disabled' : 'rc-txt-input';
    return (
      <div className={className} ref={(node) => { this.dropDownNode = node; }}>
        <div
          className="rc-selected-value"
          onClick={
          () => {
            if (!props.disabled) {
              this.toggleOptions();
            }
          }}
          role="presentation"
        >
          {
            props.autoComplete ?
              <input
                type="text"
                value={state.inputValue}
                className={inputClassName}
                placeholder={props.placeholderTxt}
                onFocus={this.handleFocus}
                onChange={this.handleTextChange}
                disabled={props.disabled}
              /> :
              <span className="rc-lbl-value">{state.inputValue ? state.inputValue : props.placeholderTxt}</span>
          }
        </div>
        {(state.selectedIndex >= 0) ? <span
          className="rc-clear-all-selection"
          onClick={() => {
          if (!props.disabled) {
            this.clearAllSelection();
          }
        }}
          role="presentation"
        >×
                                      </span> : '' }
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
  noResultsTxt: PropTypes.string,
  disabled: PropTypes.bool,
};

Dropdown.defaultProps = {
  autoComplete: true,
  className: '',
  placeholderTxt: 'Search...',
  noResultsTxt: 'No Results Found',
  disabled: false,
};
export default Dropdown;
