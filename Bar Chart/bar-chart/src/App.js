import React from 'react';

import STATE from './Components/state.js';
import { data } from './Components/data.js';
import FormsSection from './Components/FormSection/formsSection.js';
import './App.css'

const descriptionUnderTitle = "At the bottom you can choose another data file and parameters to see it on the diagram.";

// declare invalid value to add it to data, if it can't be read or undefined.
// then we filter that value from axis arrays
const INVALID = "--E--";

// also get current screen sizes (width and height)
var w = window.innerWidth;
var h = window.innerHeight;
// console.log(`Screen is ${w}px width && ${h}px height`)


export default function App() {

  const [state, setState] = React.useState(STATE);

  
  const handleChangeData = (e) => {
    const key = e.target.value;
    setState(prev => {
      return {
        ...prev,
        dataLink: data[key]["link"],
        selectedJson: key,
        fieldsToSelect: data[key]["fields"],
        selectedField: data[key]["fields"][0],
      }
    })
  };
  
  const handleChangeField = (e) => {
    const key = e.target.value;
    setState(prev => {
      return {
        ...prev,
        selectedField: prev.fieldsToSelect.filter(arr => arr[0] === key)[0],
      }
    })
  };
  
  return (
    <>
      <div>
        {
          [
            React.createElement("h2", {id:"title", key:crypto.randomUUID()}, "Bar Chart"),
            React.createElement("p", {id:"description", key:crypto.randomUUID()}, descriptionUnderTitle),
            React.createElement("hr", {key:crypto.randomUUID()}),
            React.createElement(
              "div", 
              {id:"user-choice", key:crypto.randomUUID()}, 
              <FormsSection 
                  {...{
                    links: {
                      links: state.selectedJsonFile,
                      value: state.selectedJson,
                      onChange: handleChangeData
                    }, 
                    items: {
                      items: state.fieldsToSelect,
                      value: state.selectedField[0],
                      onChange: handleChangeField
                    }
                  }}
              />
            ),
            React.createElement("hr", {key:crypto.randomUUID()}),
            React.createElement("div", {id:"bar", key:crypto.randomUUID()})
          ]
        }
      </div>
    </>
  );
}
