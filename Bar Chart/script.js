import { DATA } from "./Components/DATA";
import { STATE } from "./Components/STATE";
import GetDataForAxis from "./Components/Handler/getDataForAxis.js";
import CheckAndFilterData from "./Components/Handler/checkAndFilterData.js";
import { D3STYLES } from "./Components/D3STYLES";
import GetJSONsList from "./Components/Filler/getJSONsList.js";
// import GetDataForAxis from "./Components/Handler/getDataForAxis.js";

const dataToJsonFiles = {...DATA}

const descriptionUnderTitle = "At the bottom you can choose another data file and parameters to see it on the diagram."

// declare invalid value to add it to data, if it can't be read or undefined.
// then we filter that value from axis arrays
const INVALID = "--E--";

// also get current screen sizes (width and height)
var w = window.innerWidth;
var h = window.innerHeight;
// console.log(`Screen is ${w}px width && ${h}px height`)

const GetBarChart = ({data, field, fullWidth, fullHeigth}) => {

    // now declare bar sizes. Get it 70% of height and 85% of width
    const curW = Math.floor(fullWidth * 0.85);
    const curH = Math.floor(fullHeigth * 0.75);

    // and get the width of single line of bar
    // for scale we stay 5% of all width
    const wdthForBarLines = Math.floor(curW * 0.95); 
    
    React.useEffect(() => {
        fillBar();
    }, [data])

    const fillBar = () => {

        const axis = CheckAndFilterData(GetDataForAxis(data, field.slice(1), INVALID), INVALID);
        console.log(`axis is [${axis}]`)
        
        if (axis.every(x => x.length > 0)) {
    
            // now calculate width lines into bar
            const barW = Math.floor(wdthForBarLines / axis[0].length);
    
            const ymax = d3.max(axis[1]);
            const yAxis = d3.scaleLinear().domain([0, ymax]).range(0, curH);
            d3.select("svg")
                .selectAll("rect")
                .data(axis[1])
                .enter()
                .append("rect");
    
            d3.select("svg")
                .selectAll("rect")
                .data(axis[1])
                .style("fill", (d, i) => ( i % 2 == 0 ? "red" : "green"))
                .attr("x", (d, i) => i * barW)
                .attr("y", (d) => curH - yAxisScale(d => d + ymax * 0.1))
                .attr("height", (d) => yAxisScale(d => d + ymax * 0.1))
                .attr("width", barW)
    
        } else {
    
            alert(`...Data for link '${field[0]}' invalid. Please, check data...`);
            return;
        }

    }

    return (
        <>
            <svg width={curW} height={curH}></svg>
        </>
    );
}


function App () {

    const [state, setState] = React.useState({...STATE});

    React.useEffect(() => {
        async function getData(link) {
            const response = await fetch(link);
            const data = await response.json();
            setState(prev => {return {...prev, datas: data}})
            console.log(data)
        }
        getData(state.dataLink);
    }, [])

    return (
        <>
            <h2 id="title">Bar Chart</h2>
            <p id="description">
                {descriptionUnderTitle}
            </p>
            <hr></hr>
            <div id="user-choice">
                {/* Here we can select the link to JSON file with data */}
                {/* <GetJSONsList list={state.selectedJsonFile} /> */}
                {/* And here we can select field to display */}
                {/* <GetFieldsList list = {state.fieldsToSelect} /> */}
            </div>
            <hr></hr>
            <div id="bar">
                {/* <GetBarChart data={state.datas} field={state.selectedField} fullWidth={w} fullHeigth={h}/> */}
            </div>           

            
        </>
    )

}

ReactDOM.render(<App />, document.getElementById("root"))

