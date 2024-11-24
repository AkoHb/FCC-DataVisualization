
import {DATA} from './Components/Data.js'

const descriptionUnderTitle = "At the bottom you can choose another data file and parameters to see it on the diagram."

// declare invalid value to add it to data, if it can't be read or undefined.
// then we filter that value from axis arrays
const INVALID = "--E--";

// also get current screen sizes (width and height)
var w = window.innerWidth;
var h = window.innerHeight;
// console.log(`Screen is ${w}px width && ${h}px height`)


function App () {

    

    return (
        [
            React.createElement("h2", {id:"title", key:crypto.randomUUID()}, "Bar Chart"),
            React.createElement("p", {id:"description", key:crypto.randomUUID()}, descriptionUnderTitle),
            React.createElement("hr", {key:crypto.randomUUID()}),
            React.createElement("div", {id:"user-choice", key:crypto.randomUUID()}),
            React.createElement("hr", {key:crypto.randomUUID()}),
            React.createElement("div", {id:"bar", key:crypto.randomUUID()}),
        ]
    )

}

ReactDOM.render(<App />, document.getElementById("root"))

