import React from 'react';

import STATE from './Components/state.js';
import { data } from './Components/data.js';
import LoadData from './Components/ParseData/loadData.js';
import GetJSONsList from './Components/Filler/getJSONsList.js';
import GetFieldsList from './Components/Filler/getFieldsList.js';
import GetDataForAxis from './Components/Handler/getDataForAxis.js';
import CheckAndFilterData from './Components/Handler/checkAndFilterData.js';
import GetBarChart from './Components/Barchart/getBarChart.js';
import './App.css'

const descriptionUnderTitle = "At the bottom you can choose another data file and parameters to see it on the diagram.";

export default function App() {

  const [state, setState] = React.useState(STATE);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     setState(prev => ({ ...prev, isProcessing: true }));
  //     try {
  //       const data = await LoadData(state.dataLink);
  //       if (data) {
  //         setState(prev => ({ 
  //           ...prev, 
  //           datas: data, 
  //           isProcessing: false,
  //         }));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setState(prev => ({ ...prev, isProcessing: false })); // Reset flag on error

  //     }
  //   };
  //   fetchData();
  // }, [state.dataLink]);

  // React.useEffect(() => {
  //   if (state.datas !== null) { // Ensure data is loaded
  //     let filteredData = CheckAndFilterData(GetDataForAxis(state.datas, state.selectedField.slice(1)));
  //     setState(prev => ({...prev, dataForAxis: filteredData}));
  //   }
  // }, [state.selectedField, state.datas]);

  // React.useEffect(() => {
  //   const updateSize = () => {
  //     setSize({ width: window.innerWidth, height: window.innerHeight });
  //   };

  //   updateSize();

  //   window.addEventListener('resize', updateSize);

  //   return () => {
  //     window.removeEventListener('resize', updateSize);
  //   };
  // }, []);


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
              disabled={state.isProcessing}
            />
            <GetFieldsList 
              items={state.fieldsToSelect}
              value={state.selectedField[0]}
              onChange={handleChangeField}
              disabled={state.isProcessing}
            />
          </div>
        </div>
        <hr />
        <div id="bar">
          <GetBarChart data={state.dataForAxis} width={size.width} height={size.height}/>
        </div>
      </div>
    </div>
    </>
  );
}
