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

<SimpleDropdown values={valuesArray || valuesObj} onChangeHandler={handlerOnChange} selectedIndex={defaultSelectedValue} />
```

> Props values,onChangeHandler and selectedIndex are mandatory
