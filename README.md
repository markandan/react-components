# react-components
## SimpleDropdrown
Simple dropdown components
### Usage

```javascript
//value to be rendered as options in the dropdown can be simple array or array of objects

let valuesArray = ["Apple", "Banana", "Guava", "Orange", "Watermelon", "Pear"]; //simple array
let valuesObj = [{
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
}]; // array of objects

//function to be called when value of the dropdown is changed
handlerOnChange(selectedIndex) {
  console.log(selectedIndex);
}

//defaultedSelectedIndex value
let defaultSelectedValue = 2; //Zero indexed integer value;

<Dropdown values={valuesArray || valuesObj} onChangeHandler={handlerOnChange} selectedIndex={defaultSelectedValue} />
```

> Props values,onChangeHandler and selectedIndex are mandatory
> Props and Default values
>
values: Array (Required),
onChangeHandler: Function (Required),
selectedIndex: Number (Required) [-1 if no value to be selected or zero-based index],
autoComplete: Boolean [default is true, false to disable autoComplete feature],
className: String [Any custom class to be added],
placeholderTxt: String [String to be displayed when no items are selected , default value is "Search..."],
noResultsTxt: String [String to be displayed when no items found when using autoComplete feature. Note: This prop is not used when autoComplete is false],
disabled: Boolean [to disable the dropdown, default is false],
