import React from "react";
import {mount} from "enzyme";
import SimpleDropdown from "./Dropdown";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe("<SimpleDropdown/>", () => {
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

  beforeEach(() => {
    dropDown = mount(<SimpleDropdown values={values} onChangeHandler={onChangeHandler} selectedIndex={2} className={className} placeholderTxt={placeholderTxt}/>);
  });
  test("should set the selectedIndex in the state", () => {
    expect(dropDown.state("selectedIndex")).toEqual(2);
    expect(dropDown.state("inputValue")).toEqual(values[2].label);
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
    expect(dropDown.find(".rc-txt-input").instance().value).toEqual(values[3].label);
  });
  test("should have the placeholdertext in the textbox", () => {
    expect(dropDown.find(".rc-txt-input").prop("placeholder")).toEqual(placeholderTxt);
  });
  test("should toggle the class 'open' when rc-selected-value is clicked", () => {
    dropDown.find(".rc-selected-value").simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(1);
    dropDown.find(".rc-selected-value").simulate("click");
    expect(dropDown.find(".rc-dropdown.open")).toHaveLength(0);
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
  test("should have the custom className that is passed on as prop", () => {
    expect(dropDown.find(`.rc-dropdown.${className}`)).toHaveLength(1);
  });
  test("should render the close button to clear the selection", () => {
    expect(dropDown.find(".rc-clear-all-selection")).toHaveLength(1);
  });
  test("should clear the selectedIndex when the close button is clicked", () => {
    dropDown.find(".rc-clear-all-selection").simulate("click");
    expect(dropDown.state("selectedIndex")).toEqual(-1);
    expect(dropDown.state("inputValue")).toEqual("");
    expect(dropDown.find(".rc-selected-value").text()).toEqual("");
    expect(dropDown.find(".rc-clear-all-selection")).toHaveLength(0);
  });
});
