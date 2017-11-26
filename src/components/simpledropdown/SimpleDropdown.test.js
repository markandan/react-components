import React from "react";
import {mount} from "enzyme";
import SimpleDropdown from "./SimpleDropdown";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe("<SimpleDropdown/>", () => {
  let simpleDropDown = null;
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
    simpleDropDown = mount(<SimpleDropdown values={values} onChangeHandler={onChangeHandler} selectedIndex={2} className={className} placeholderTxt={placeholderTxt}/>);
  });
  test("should set the selectedIndex in the state", () => {
    expect(simpleDropDown.state("selectedIndex")).toEqual(2);
  });
  test("should render the selectedValue label", () => {
    expect(simpleDropDown.find(".selectedValue").text()).toEqual(values[2].label);
  });
  test("should not render the selected value if the selectedIndex is -1", () => {
    simpleDropDown.setState({selectedIndex: -1});
    expect(simpleDropDown.find(".selectedValue").text()).toEqual("");
  });
  test("should render the dropdown values based on the array provided", () => {
    expect(simpleDropDown.find(".rc-dropdown-options").children()).toHaveLength(values.length);
    expect(simpleDropDown.find(".rc-dropdown-options").childAt(0).text()).toEqual(values[0].label);
  });
  test("should render the values if the values is a simple array and not an object", () => {
    simpleDropDown.setProps({values: valueArray});
    simpleDropDown.setState({selectedIndex: 0});
    expect(simpleDropDown.find(".rc-dropdown-options").children()).toHaveLength(valueArray.length);
    expect(simpleDropDown.find(".rc-dropdown-options").childAt(0).text()).toEqual(valueArray[0]);
  });
  test("should have the default className", () => {
    expect(simpleDropDown.find(".rc-dropdown")).toHaveLength(1);
  });
  test("should toggle the class 'open' when selectedValue is clicked", () => {
    simpleDropDown.find(".selectedValue").simulate("click");
    expect(simpleDropDown.find(".rc-dropdown.open")).toHaveLength(1);
    simpleDropDown.find(".selectedValue").simulate("click");
    expect(simpleDropDown.find(".rc-dropdown.open")).toHaveLength(0);
  });
  test("should change the selectedIndex and value when an option is clicked", () => {
    simpleDropDown.find(".rc-dropdown-options").childAt(3).simulate("click");
    expect(simpleDropDown.state("selectedIndex")).toEqual(3);
    expect(simpleDropDown.find(".selectedValue").text()).toEqual(values[3].label);
  });
  test("should close the dropdown on selection of an option", () => {
    simpleDropDown.find(".selectedValue").simulate("click");
    expect(simpleDropDown.find(".rc-dropdown.open")).toHaveLength(1);
    simpleDropDown.find(".rc-dropdown-options").childAt(2).simulate("click");
    expect(simpleDropDown.find(".rc-dropdown.open")).toHaveLength(0);
  });
  test("should call the onChangeHandler when an option is changed", () => {
    onChangeHandler.mockReset();
    simpleDropDown.find(".selectedValue").simulate("click");
    expect(simpleDropDown.find(".rc-dropdown.open")).toHaveLength(1);
    simpleDropDown.find(".rc-dropdown-options").childAt(3).simulate("click");
    expect(simpleDropDown.find(".rc-dropdown.open")).toHaveLength(0);
    expect(onChangeHandler).toHaveBeenCalled();
    expect(onChangeHandler.mock.calls[0][0]).toEqual(3);
  });
  test("should have the custom className that is passed on as prop", () => {
    expect(simpleDropDown.find(`.rc-dropdown.${className}`)).toHaveLength(1);
  });
  test("should render the close button to clear the selection", () => {
    expect(simpleDropDown.find(".clearAllSelection")).toHaveLength(1);
  });
  test("should clear the selectedIndex when the close button is clicked", () => {
    simpleDropDown.find(".clearAllSelection").simulate("click");
    expect(simpleDropDown.state("selectedIndex")).toEqual(-1);
    expect(simpleDropDown.find(".selectedValue").text()).toEqual("");
    expect(simpleDropDown.find(".clearAllSelection")).toHaveLength(0);
  });

});
