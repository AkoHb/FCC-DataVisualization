// arrayOfKeys it's a slice of filds data (all except first value) that contain into state.selectedField
// short it looks like state.selectedField.slice(1)
// like full path dataToJsonFiles.default.fields[i].slice(1) 

export default function getDataForAxis (data, arrayOfKeys, INVALID) {

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