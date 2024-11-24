// Fields data contain next values: 
// 1. How it was display in select options
// 2. JSON path, where data for two axis contain
// 3. Name for x axis
// 4. Name for y axis
// For example 3rd and 4th values will looks like 2nd value + one of them : data-date or data-GDP
// 5. Contain type of data into x-y axis. For example in default data type by 2nd el is array.
// It mean, that we destructuring data. [3rd value, 4th value] ([date, GDP] => ["2019-11-12", "547.1"])
// If value by 3rd and 4th key is simple, select "str"


const dataToJsonFiles = {
    "default": {
        "link" : "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
        "select-name": "---FCC default---",
        "fields": [["Gross Domestic Product", "data", "date", "GDP", "array"]],
        
    },
    "covid-all-world-data": {
        "link": "https://disease.sh/v3/covid-19/countries",
        "select-name": "Covid 2019 All countries",
        "fields": [
            ["Count of cases", "cases", "country", "cases", "str"], 
            ["Count of recovered", "recovered", "country", "recovered", "str"], 
            ["Count of deaths", "deaths", "country", "deaths", "str"], 
            ["Count of cases per million", "casesPerOneMillion", "country", "casesPerOneMillion", "str"],
            ["Count of deaths per million", "deathsPerOneMillion", "country", "casdeathsPerOneMilliones", "str"],
            ["Count of tests", "tests", "country", "tests", "str"],
        ]
    }

}

const descriptionUnderTitle = "At the bottom you can choose another data file and parameters to see it on the diagram."

// declare invalid value to add it to data, if it can't be read or undefined.
// then we filter that value from axis arrays
const INVALID = "--E--";

const backgroundImages = {
    "default" : ""
}

const colorsForDiagrams = {
    "main" : "",
    "x-axis" : "",
    "y-axis" : "",
    "odd-line" : "",
    "even-line" : ""
}

// also get current screen sizes (width and height)
var w = window.innerWidth;
var h = window.innerHeight;

// console.log(`Screen is ${w}px width && ${h}px height`)

// arrayOfKeys it's a slice of filds data (all except first value) that contain into state.selectedField
// short it looks like state.selectedField.slice(1)
// like full path dataToJsonFiles.default.fields[i].slice(1) 

const getDataForAxis = (data, arrayOfKeys) => {

    if ([data.size, data.length].some(x => x <= 0)) return [[], []];

    let xAxis = [];
    let yAxis = [];
    let a,b;

    if (arrayOfKeys[3] === "str") {
        data.forEach(obj => {
            a = obj[arrayOfKeys[1]] ? obj[arrayOfKeys[1]] : INVALID;
            b = obj[arrayOfKeys[2]] ? obj[arrayOfKeys[2]] : INVALID;
            xAxis.push(a);
            yAxis.push(b);
        })

    } else if (arrayOfKeys[3] === "array") {
        data[arrayOfKeys[0]].forEach((arr) => {
            a = arr[0] ? arr[0] : INVALID;
            b = arr[1] ? arr[1] : INVALID;
            xAxis.push(a);
            yAxis.push(b);
        })
    }

    return [xAxis, yAxis]
};

const checkAndFilterData = arrOfTwoArrays => {
    let res = [[], []];
    if (arrOfTwoArrays.length !== 2) return res;

    // if first and second arrays has different length, slice by shortest array

    let minLength = arrOfTwoArrays[0].length > arrOfTwoArrays[1].length 
        ? arrOfTwoArrays[1].length
        : arrOfTwoArrays[0].length

    for (let i = 0; i < minLength; i++) {
        if ([arrOfTwoArrays[0][i], arrOfTwoArrays[1][i]].every(x => x !== INVALID)) {
            res[0].push(arrOfTwoArrays[0][i]);
            res[1].push(arrOfTwoArrays[1][i]);
        }
    }
    console.log(res);
    
    return res
}



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

        const axis = checkAndFilterData(getDataForAxis(data, field.slice(1)));
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
                .attr("y", (d) => curH - yScale(d + ymax * 0.1))
                .attr("height", (d) => yScale(d + ymax * 0.1))
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

    const [state, setState] = React.useState({
        dataLink :  dataToJsonFiles.default.link,
        selectedJson : "default",
        selectedJsonFile : Object.keys(dataToJsonFiles).map(key => [key, dataToJsonFiles[key]["select-name"]]),
        fieldsToSelect : dataToJsonFiles.default.fields,
        selectedField: dataToJsonFiles.default.fields[0],
        datas: []
    });

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
                <form>
                    <label for="data">View data of</label>
                    <select name="jsonData" id="data">
                        {
                            state.selectedJsonFile.map(([key, value]) => <option value={key}>{value}</option>)
                        }
                    </select>
                </form>
                {/* And here we can select field to display */}
                <form>
                    <label for="field">With field</label>
                    <select name="field-data" id="field">
                        {
                            state.fieldsToSelect.map(([key, value]) => <option value={value}>{key}</option>)
                        }
                    </select>
                </form>
            </div>
            <hr></hr>
            <div id="bar">
                <GetBarChart data={state.datas} field={state.selectedField} fullWidth={w} fullHeigth={h}/>
            </div>           

            
        </>
    )

}

ReactDOM.render(<App />, document.getElementById("root"))

