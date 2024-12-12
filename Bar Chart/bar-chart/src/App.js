import React, { Suspense } from 'react';

// Data
import STATE from './Components/state.js';
import { data } from './Components/data.js';

// Sections
import Tests from './Components/Sections/tests.js';
import ChangeFileOrLink from './Components/Sections/changeFileOrLink.js';
import HandleTest from './Components/Sections/handleTest.js';
import ChooseAxis from './Components/Sections/chooseAxis.js';
import ChooseInfoMsg from './Components/Sections/chooseInfoMsg.js';
import ChooseChart from './Components/Sections/chooseChart.js';

// Handlers
import LoadData from './Components/ParseData/loadData.js';
import GetJSONsList from './Components/Filler/getJSONsList.js';
import GetFieldsList from './Components/Filler/getFieldsList.js';
import GetDataForAxis from './Components/Handler/getDataForAxis.js';
import CheckAndFilterData from './Components/Handler/checkAndFilterData.js';
import GetBarChart from './Components/Barchart/getBarChart.js';

// Styles
import './App.css'

// Icons
import { SiTestcafe } from "react-icons/si";            // Test icon
import { SiAmazondocumentdb } from "react-icons/si";    // Choose file or insert link icon
import { LuAxis3D } from "react-icons/lu";              // Select or swap axis icon
import { TbAxisY } from "react-icons/tb";               // Y axis icon
import { TbAxisX } from "react-icons/tb";               // X axis icon
import { IoMdSwap } from "react-icons/io";              // swap axis icon
import { SlInfo } from "react-icons/sl";                // info messages icon
import { SiSoundcharts } from "react-icons/si";         // choose chart type icon




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
    console.log(key)
    const selectedData = data[key];
    setState(prev => {
      if (key === "add-link") {
        return {
          ...prev,
          isAddLink: true,
          selectedJson: "Add link"
        }
      } else {
        return {
          ...prev,
          dataLink: selectedData.link,
          selectedJson: key,
          isAddLink: false,
        }
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

  const handleChangeLink = (link) => {
    console.log(link);
    // setState(prev => ({...prev, dataLink: link}))
  }

  const handleChangeFormat = (e) => {
    console.log(e)
    // let format = e.target.value;
    // console.debug(`You changed file format from "${state.dataType.toUpperCase()}" to "${format.toUpperCase()}"`);
    // setState(prev => ({...prev, dataType: format}));
  }

  return (
    <>
      <div>
        <div>
        <h2 id="title">Charts for FCC</h2>
        <p id="description">{descriptionUnderTitle}</p>
        <hr />
        <div className="container">
          <Tests icon={<SiTestcafe />} onChange={HandleTest} />
          <hr />
          <ChangeFileOrLink
            icon={<SiAmazondocumentdb />} 
            links={state.selectedJsonFile}
            value={state.selectedJson}
            onChange={{
              select: handleChangeData,
              format: handleChangeFormat
            }}
            onSubmit={handleChangeLink}
            disabled={state.isTest}
            insertLink={state.isAddLink}
          />
          <hr />
          <ChooseAxis 

            icons={{
              main : <LuAxis3D />,
              yIcon: <TbAxisY />,
              xIcon: <TbAxisX />,
              swapIcon: <IoMdSwap/>
            }}

            values={{
              yAxis: state.yAxis,
              xAxis: state.xAxis
            }}

            selected={{
              yAxis: state.selectedYAxis,
              xAxis: state.selectedXAxis
            }}

            disabled={state.isTest}

            onChange={{
              yAxis: () => console.log("Changed y-axis"),
              xAxis: () => console.log("Changed x-axis"),
              swap: () => console.log("Press swaped")
            }}
          />
          <hr />
          <ChooseInfoMsg 
            icon={<SlInfo />}
            values={state.infoData}
            selected={state.selectedInfoData}
            disabled={state.isTest}
            onChange={() => console.log("You change info msg ")}
          />
          <hr />
          <ChooseChart 
            icon={<SiSoundcharts />}
            selected={state.selectedChartType}
            disabled={state.isTest}
            onChange={() => console.log("You change chart type")}
          />
          <hr />
          <div className='btns'>
            <button id='get-chart'>
              Get Diagramm
            </button>
            <button id="get-another-one"> 
              Get another one
            </button>
          </div>
        </div>
        <div id="bar">
          <Suspense fallback={<p>Processing data...</p>}>
            <GetBarChart data={state.dataForAxis} width={size.width} height={size.height}/>
          </Suspense>
        </div>
      </div>
    </div>
    </>
  );
}
