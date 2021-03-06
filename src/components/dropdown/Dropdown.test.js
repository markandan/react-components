import React from "react";
import {mount} from "enzyme";
import Dropdown from "./Dropdown";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe("<Dropdown/>", () => {
  let dropDown = null;
  const values = [{
    value: 1, label: "Apple"
  },{
    value: 2, label: "Banana"
  },{
    value: 3, label: "Guava"
  },{
    value: 4, label: "Orange"
  },{
    value: 5, label: "Watermelon"
  },{
    value: 6, label: "Pear"
  }];
  const valueArray = ["Apple", "Banana", "Guava", "Orange", "Watermelon", "Pear"];
  const onChangeHandler = jest.fn();
  const className = "customClass";
  const placeholderTxt = "Select...";
  const filterValues = [{value: 2, label: "Banana"}, {value: 4, label: "Orange"}];
  const noOptionsFound = "No Results Found";
  const width = 300;
  const valuesWithDisabledOption = [{
    value: 1, label: "Apple"
  },{
    value: 2, label: "Banana"
  },{
    value: 3, label: "Guava", disabled: true
  },{
    value: 4, label: "Orange"
  },{
    value: 5, label: "Watermelon"
  },{
    value: 6, label: "Pear"
  }];
  const map = {};
  document.addEventListener = jest.fn((event, cb) => {
    map[event] = cb;
  });
  beforeEach(() => {
    dropDown = mount(<Dropdown values={values} onChangeHandler={onChangeHandler} selectedIndex={2} className={className} placeholderTxt={placeholderTxt} width={width}/>);
  });

  const filterValuesArray = ["Banana", "Orange"];
  beforeEach(() => {
    dropDown = mount(<Dropdown values={values} onChangeHandler={onChangeHandler} selectedIndex={2} className={className} placeholderTxt={placeholderTxt}/>);
  });
  test("should set the selectedIndex, inputValue, filteredValues, isOpen in the state", () => {
    expect(dropDown.state("selectedIndex")).toEqual(2);
    expect(dropDown.state("inputValue")).toEqual(values[2].label);
    expect(dropDown.state("isOpen")).toEqual(false);
    expect(dropDown.state("filteredValues")).toEqual(values);
  });
  test("should not render the selected value if the selectedIndex is -1", () => {
    dropDown.setState({selectedIndex: -1, inputValue: ""});
    expect(dropDown.find(".rc-txt-input").instance().value).toEqual("");
    expect(dropDown.state("inputValue")).toEqual("");
  });
  test("should render the dropdown values based on the array provided", () => {
    expect(dropDown.find(".rc-dropdown-options").children()).toHaveLength(values.length);
    expect(dropDown.find(".rc-dropdown-options").childAt(0).text()).toEqual(values[0].label);
  });
  test("should render the values if the values is a simple array and not an object", () => {
    dropDown.setProps({values: valueArray});
    dropDown.setState({selectedIndex: 0});
    expect(dropDown.find(".rc-dropdown-options").children()).toHaveLength(valueArray.length);
    expect(dropDown.find(".rc-dropdown-options").childAt(0).text()).toEqual(valueArray[0]);
  });
  test("should have the default className", () => {
    expect(dropDown.find(".rc-dropdown")).toHaveLength(1);
  });
  test("should render the default className if custom className is not given", () => {
    dropDown.setProps({className: ""});
    expect(dropDown.find(".rc-dropdown")).toHaveLength(1);
  });
  test("should render the textbox enabling users to search", () => {
    expect(dropDown.find(".rc-txt-input")).toHaveLength(1);
  });
  test("should render the rc-selected-value in the textbox", () => {
    expect(dropDown.find(".rc-txt-input").instance().value).toEqual(values[2].label);
  });
  test("should change the selectedIndex and value when an option is clicked", () => {
    dropDown.find(".rc-dropdown-options").childAt(3).simulate("click");
    expect(dropDown.state("selectedIndex")).toEqual(3);
    expect(dropDown.state("inputValue")).toEqual(values[3].label);
    expect(dropDown.state("isOpen")).toEqual(false);
    expect(dropDown.find(".rc-txt-input").instance().value).toEqual(values[3].label);
  });
  test("should have the placeholdertext in the textbox", () => {
    expect(dropDown.find(".rc-txt-input").prop("placeholder")).toEqual(placeholderTxt);
  });
  test("should toggle the class 'open' when rc-selected-value is clicked", () => {
    dropDown.find(".rc-selected-value").simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(1);
    expect(dropDown.state("isOpen")).toEqual(true);
    dropDown.find(".rc-selected-value").simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(0);
    expect(dropDown.state("isOpen")).toEqual(false);
  });
  test("should close the dropdown on selection of an option", () => {
    dropDown.find(".rc-selected-value").simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(1);
    dropDown.find(".rc-dropdown-options").childAt(2).simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(0);
  });

  test("should call the onChangeHandler when an option is changed", () => {
    onChangeHandler.mockReset();
    dropDown.find(".rc-selected-value").simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(1);
    dropDown.find(".rc-dropdown-options").childAt(3).simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(0);
    expect(onChangeHandler).toHaveBeenCalled();
    expect(onChangeHandler.mock.calls[0][0]).toEqual(3);
  });

  test("should only change the state when there is no onChnageHandler", () => {
    dropDown.setProps({onChangeHandler: null});
    dropDown.find(".rc-selected-value").simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(1);
    dropDown.find(".rc-dropdown-options").childAt(3).simulate("click");
    expect(dropDown.state("selectedIndex")).toEqual(3);
    expect(dropDown.state("inputValue")).toEqual(values[3].label);
    expect(dropDown.state("isOpen")).toEqual(false);
  });

  test("should call the onChangeHandler when an option is changed and valueis only Array", () => {
    onChangeHandler.mockReset();
    dropDown.setProps({values: valueArray});
    dropDown.find(".rc-selected-value").simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(1);
    dropDown.find(".rc-dropdown-options").childAt(3).simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(0);
    expect(onChangeHandler).toHaveBeenCalled();
    expect(onChangeHandler.mock.calls[0][0]).toEqual(3);
  });

  test("should have the custom className that is passed on as prop", () => {
    expect(dropDown.find(`.rc-dropdown.${className}`)).toHaveLength(1);
  });
  test("should render the close button to clear the selection", () => {
    expect(dropDown.find(".rc-clear-all-selection")).toHaveLength(1);
    expect(dropDown.state("filteredValues")).toEqual(values);
  });
  test("should clear the selectedIndex when the close button is clicked", () => {
    dropDown.find(".rc-clear-all-selection").simulate("click");
    expect(dropDown.state("selectedIndex")).toEqual(-1);
    expect(dropDown.state("inputValue")).toEqual("");
    expect(dropDown.find(".rc-selected-value").text()).toEqual("");
    expect(dropDown.find(".rc-clear-all-selection")).toHaveLength(0);
  });
  test("should filter the options based on the value in the textbox", () => {
    expect(dropDown.state("filteredValues")).toEqual(values);
    dropDown.find(".rc-txt-input").simulate('change', { target: { value: 'an' } });
    expect(dropDown.state("inputValue")).toEqual('an');
    expect(dropDown.state("filteredValues")).toEqual([{value: 2, label: "Banana"}, {value: 4, label: "Orange"}]);
  });
  test("should render only options that are filtered based on the values in textbox", () => {
    expect(dropDown.state("filteredValues")).toEqual(values);
    dropDown.find(".rc-txt-input").simulate('change', { target: { value: 'an' } });
    expect(dropDown.state("filteredValues")).toEqual(filterValues);
    expect(dropDown.find(".rc-dropdown-options").children()).toHaveLength(filterValues.length);
    expect(dropDown.find(".rc-dropdown-options").childAt(0).text()).toEqual(filterValues[0].label);
  });
  test("should render only options that are filtered based on the values in textbox if the values is only an array", () => {
    dropDown.setProps({values: valueArray});
    expect(dropDown.state("filteredValues")).toEqual(valueArray);
    dropDown.find(".rc-txt-input").simulate('change', { target: { value: 'an' } });
    expect(dropDown.state("filteredValues")).toEqual(filterValuesArray);
    expect(dropDown.find(".rc-dropdown-options").children()).toHaveLength(filterValuesArray.length);
    expect(dropDown.find(".rc-dropdown-options").childAt(0).text()).toEqual(filterValuesArray[0]);
  });
  test("should render error message when there is no options for the keyed in string", () => {
    expect(dropDown.state("filteredValues")).toEqual(values);
    dropDown.find(".rc-txt-input").simulate('change', { target: { value: 'ab' } });
    expect(dropDown.state("filteredValues")).toEqual([]);
    expect(dropDown.find(".rc-dropdown-options").children()).toHaveLength(1);
    expect(dropDown.find(".rc-error")).toHaveLength(1);
    expect(dropDown.find(".rc-dropdown-options").childAt(0).text()).toEqual(noOptionsFound);
  });

  test("should render error message based on the props", () => {
    dropDown.setProps({noResultsTxt: "Not Found"});
    expect(dropDown.state("filteredValues")).toEqual(values);
    dropDown.find(".rc-txt-input").simulate('change', { target: { value: 'ab' } });
    expect(dropDown.state("filteredValues")).toEqual([]);
    expect(dropDown.find(".rc-dropdown-options").children()).toHaveLength(1);
    expect(dropDown.find(".rc-dropdown-options").childAt(0).text()).toEqual("Not Found");
  });
  test ("should not render textbox if autocomplete is false", () => {
    dropDown.setProps({autoComplete: false});
    expect(dropDown.find(".rc-txt-input")).toHaveLength(0);
    expect(dropDown.find(".rc-lbl-value")).toHaveLength(1);
  });
  test ("should render placeholder text when autocomplete is false and selectedIndex is -1", () => {
    dropDown.setProps({autoComplete: false, selectedIndex: -1});
    expect(dropDown.find(".rc-txt-input")).toHaveLength(0);
    expect(dropDown.find(".rc-lbl-value")).toHaveLength(1);
    expect(dropDown.find(".rc-lbl-value").text()).toEqual(placeholderTxt);
  });
  test ("should disable the textbox and the click events when the disabled prop is passed", () => {
    dropDown.setProps({autoComplete: true, disabled: true});
    expect(dropDown.find('.rc-dropdown.disabled')).toHaveLength(1);
    expect(dropDown.find(".rc-txt-input.disabled")).toHaveLength(1);
    dropDown.find(".rc-selected-value").simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(0);
    dropDown.find(".rc-clear-all-selection").simulate("click");
    expect(dropDown.state("selectedIndex")).toEqual(2);

    dropDown.setProps({autoComplete: true, disabled: false});
    expect(dropDown.find('.rc-dropdown.disabled')).toHaveLength(0);
    expect(dropDown.find(".rc-txt-input.disabled")).toHaveLength(0);
    dropDown.find(".rc-selected-value").simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(1);
    dropDown.find(".rc-clear-all-selection").simulate("click");
    expect(dropDown.state("selectedIndex")).toEqual(-1);
  });

  test ("should disable the options and the click events when the disabled prop for the option is passed", () => {
    dropDown.setProps({values: valuesWithDisabledOption});
    onChangeHandler.mockReset();
    expect(dropDown.find(".rc-option.disabled")).toHaveLength(1);
    dropDown.find(".rc-option.disabled").simulate("click");
    expect(onChangeHandler).not.toHaveBeenCalled();
  });
  test("should add selected class to the option selected", () => {
    onChangeHandler.mockReset();
    dropDown.find(".rc-selected-value").simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(1);
    dropDown.find(".rc-dropdown-options").childAt(3).simulate("click");
    expect(dropDown.find(".rc-option.selected")).toHaveLength(1);
  });
  test("on calling the openOptions the state should be updated", () => {
    dropDown.instance().openOptions();
    expect(dropDown.state("isOpen")).toEqual(true);
  });
  test("on calling the closeOptions the state should be updated", () => {
    dropDown.instance().closeOptions();
    expect(dropDown.state("isOpen")).toEqual(false);
  });
  test("checking whether the select function is called when calling handleFocus", () => {
    onChangeHandler.mockReset();
    dropDown.instance().handleFocus({target: { select: onChangeHandler, value: 'an'}});
    expect(onChangeHandler).toHaveBeenCalled();
  });
  test("checking handleTextChange function", () => {
    dropDown.instance().handleTextChange({target: { value: 'an'}});
    expect(dropDown.state("filteredValues")).toEqual([{value: 2, label: "Banana"}, {value: 4, label: "Orange"}]);
    expect(dropDown.state("inputValue")).toEqual('an');
  });
  test("should reset the state when clearAllSelection method is called", () => {
    dropDown.instance().clearAllSelection();
    expect(dropDown.state("inputValue")).toEqual('');
    expect(dropDown.state("selectedIndex")).toEqual(-1);
    expect(dropDown.state("filteredValues")).toEqual(values);
  });
  test("getInputValue method to return the correct value if selected index is passed else it should be blank", () => {
    expect(dropDown.instance().getInputValue(-1, values)).toEqual('');
    expect(dropDown.instance().getInputValue(1, values)).toEqual(values[1].label);
    expect(dropDown.instance().getInputValue(1, valueArray)).toEqual(valueArray[1]);
  });
  test("checkValueSelected should return true if value is found or else false", () => {
    expect(dropDown.instance().checkValueSelected({ value: 3, label: "Guava"})).toEqual(true);
    dropDown.instance().clearAllSelection();
    expect(dropDown.instance().checkValueSelected({ value: 3, label: "Guava"})).toEqual(false);
  });
  test("handleDocumentClick updates the state properly", () => { 
    dropDown.find(".rc-selected-value").simulate("click");    
    dropDown.instance().handleDocumentClick({target: null});
    expect(dropDown.state("isOpen")).toEqual(false);
    expect(dropDown.state("inputValue")).toEqual(values[2].label);
  });
  test("should toggle the class 'open' when document is clicked", () => {
    dropDown.find(".rc-selected-value").simulate("click");
    expect(dropDown.state("isOpen")).toEqual(true);
    map.click({target: null});
    expect(dropDown.state("isOpen")).toEqual(false);
  });   
  test("toggleOptions function should toggle the state isOpen", () => { 
    dropDown.instance().toggleOptions();
    expect(dropDown.state("isOpen")).toEqual(true);
    dropDown.instance().toggleOptions();
    expect(dropDown.state("isOpen")).toEqual(false);
  });
  test("should update the state when the selectedIndex prop is changed", () => {
    dropDown.setProps({selectedIndex: 0});
    expect(dropDown.state("selectedIndex")).toEqual(0);
    expect(dropDown.state("inputValue")).toEqual(values[0].label);
  });
  test("should update the state when the values prop is changed", () => {
    dropDown.setProps({values: valueArray});
    expect(dropDown.state("filteredValues")).toEqual(valueArray);
  });
});

