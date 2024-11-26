import React from 'react';

import STATE from './Components/state.js';
import { data } from './Components/data.js';
import GetJSONsList from './Components/Filler/getJSONsList.js';
import GetFieldsList from './Components/Filler/getFieldsList.js';
import GetDataForAxis from './Components/Handler/getDataForAxis.js';
import CheckAndFilterData from './Components/Handler/checkAndFilterData.js';
import GetInfoMsg from "./Components/Filler/getInfoMsg.js"
import './App.css'

const descriptionUnderTitle = "At the bottom you can choose another data file and parameters to see it on the diagram.";

// declare invalid value to add it to data, if it can't be read or undefined.
// then we filter that value from axis arrays
const INVALID = "--E--";


export default function App() {

  const [state, setState] = React.useState(STATE);

  React.useEffect(()=>{
    async function tryLoadData (link) {
    
      console.debug(GetInfoMsg("Get link and try to load data"));
  
      const regToLink = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
      let data = null;
  
      if (!regToLink.test(link)) {
          console.log(GetInfoMsg('Link failed RegExp check'));
          return data;
      };
  
      console.debug(GetInfoMsg('Link successfully checked by RegExp'));
      
      try {
          const response  = await fetch(`${link}`);
      
          if (!response.ok) {
              throw new Error("---During loading data something went wrong--- \n---Please try again after few minutes---");
          }
          
          data = await response.json();
          console.log(GetInfoMsg("Data is loaded"))
          
      } catch(e){
          console.error(e);
          console.log("---Link is not valid to load data--- \n---Please, check it---");
      }
  
      setState(prev => ({...prev, datas: data}));
    };
    tryLoadData(state.dataLink);

  }, [state.dataLink]);

  React.useEffect(() => {
    // now we check and filtering data for chosen fields.

    GetDataForAxis(state.datas, state.selectedField.slice(1), INVALID);
    
  }, [state.selectedField])










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

  console.debug(state.datas)
  
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
              <div id='user-select'>
                <GetJSONsList 
                  links = {state.selectedJsonFile}
                  value = {state.selectedJson}
                  onChange={handleChangeData}
                />
                <GetFieldsList 
                  items = {state.fieldsToSelect}
                  value = {state.selectedField[0]}
                  onChange = {handleChangeField}
                />
              </div>
            ),
            React.createElement("hr", {key:crypto.randomUUID()}),
            React.createElement("div", {id:"bar", key:crypto.randomUUID()})
          ]
        }
      </div>
    </>
  );
}
