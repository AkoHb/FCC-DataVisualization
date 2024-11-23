const dataToJsonFiles = {
    "default": {
        "link" : "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
        "select-name": "---FCC default---",
        "fields": [["Gross Domestic Product", "data"]]
    },
    "covid-all-world-data": {
        "link": "https://disease.sh/docs/#/COVID-19%3A%20Worldometers/get_v3_covid_19_countries",
        "select-name": "Covid 2019 All countries",
        "fields": [
            ["Count of cases", "cases"], 
            ["Count of recovered", "recovered"], 
            ["Count of deaths", "deaths"], 
            ["Count of cases per million", "casesPerOneMillion"],
            ["Count of deaths per million", "deathsPerOneMillion"],
            ["Count of tests", "tests"],
        ]
    }

}

const descriptionUnderTitle = "At the bottom you can choose another data file and parameters to see it on the diagram."

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

console.log(`Screen is ${w}px width && ${h}px height`)
function App () {

    const [state, setState] = React.useState({
        dataLink :  dataToJsonFiles.default.link,
        selectedJson : "default",
        selectedJsonFile : Object.keys(dataToJsonFiles).map(key => [key, dataToJsonFiles[key]["select-name"]]),
        fieldsToSelect : dataToJsonFiles.default.fields,
        selectedField: dataToJsonFiles.default.fields[0][1],
        datas: []
    });

    React.useEffect(() => {
        async function getData(link) {
            const response = await fetch(link);
            const data = response.json();
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


            
        </>
    )

}

ReactDOM.render(<App />, document.getElementById("root"))


const getBarChart = (data, field, fullWidth, fullHeigth) => {
    
}