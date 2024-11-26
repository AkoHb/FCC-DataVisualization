import React from 'react';

import STATE from './Components/state.js';
import { data } from './Components/data.js';
import LoadData from './Components/ParseData/loadData.js';
import GetJSONsList from './Components/Filler/getJSONsList.js';
import GetFieldsList from './Components/Filler/getFieldsList.js';
import GetDataForAxis from './Components/Handler/getDataForAxis.js';
import CheckAndFilterData from './Components/Handler/checkAndFilterData.js';
import './App.css'

const descriptionUnderTitle = "At the bottom you can choose another data file and parameters to see it on the diagram.";

export default function App() {

  const [state, setState] = React.useState(STATE);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await LoadData(state.dataLink);
        if (data) {
          setState(prev => ({ ...prev, datas: data}));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    };
    fetchData();
  }, [state.dataLink]);

  React.useEffect(() => {
    if (state.datas.length > 0) { // Ensure data is loaded
      let filteredData = CheckAndFilterData(GetDataForAxis(state.datas, state.selectedField.slice(1)));
      setState(prev => ({...prev, dataForAxis: filteredData}));
    }
  }, [state.selectedField, state.datas]);

  const handleChangeData = (e) => {
    const key = e.target.value;
    const selectedData = data[key];
    setState(prev => {
      return {
        ...prev,
        dataLink: selectedData.link,
        selectedJson: key,
        fieldsToSelect: selectedData.fields,
        selectedField: selectedData.fields[0],
      }
    })
  };
  
  const handleChangeField = (e) => {
    const key = e.target.value;
    const selectedField = state.fieldsToSelect.find(field => field[0] === key);
    setState(prev => {
      return {
        ...prev,
        selectedField,
      }
    })
  };

  console.debug(state.datas)
  
  return (
    <>
      <div>
        <div>
        <h2 id="title">Bar Chart</h2>
        <p id="description">{descriptionUnderTitle}</p>
        <hr />
        <div id="user-choice">
          <div id="user-select">
            <GetJSONsList 
              links={state.selectedJsonFile}
              value={state.selectedJson}
              onChange={handleChangeData}
            />
            <GetFieldsList 
              items={state.fieldsToSelect}
              value={state.selectedField[0]}
              onChange={handleChangeField}
            />
          </div>
        </div>
        <hr />
        <div id="bar"></div>
      </div>
    </div>
    </>
  );
}
