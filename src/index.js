import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import 'raf/polyfill';

import Dropdown from "./components/dropdown/Dropdown";

const values = [{
  value: 1, label: "Apple"
},{
  value: 2, label: "Banana"
},{
  value: 3, label: "Guava"
},{
  value: 4, label: "Orange"
},{
  value: 5, label: "WatermelonWatermelon"
},{
  value: 6, label: "Pear"
}];

const App = () => {
    ReactDom.render(
          <Dropdown values={values} onChangeHandler={()=>{}}
            selectedIndex={0} autoComplete={false} placeholderTxt="Search..."/>,
        document.getElementById('root')
    );
};
App();
