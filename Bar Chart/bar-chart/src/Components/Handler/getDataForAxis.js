import CheckAndFilterData from "./checkAndFilterData";
import GetInfoMsg from "../Filler/getInfoMsg";

// arrayOfKeys it's a slice of filds data (all except first value) that contain into state.selectedField
// short it looks like state.selectedField.slice(1)
// like full path dataToJsonFiles.default.fields[i].slice(1) 

export default function getDataForAxis (data, arrayOfKeys) {
    
    console.debug(GetInfoMsg("Filtering data by selected fields"));
    
    let xAxis = [];
    let yAxis = [];
    let result = [xAxis, yAxis];

    if (!data) {
        console.debug(GetInfoMsg("Data is null or undefined."));
        
        return [[], []];
    }

    // console.log(data)

    if (Array.isArray(data)) {
        
        if (arrayOfKeys.length < 3) {
            console.debug(GetInfoMsg("Invalid arrayOfKeys for 'str' data"));
            return result;
        };

        result = data.reduce((res, obj) => [
            [...res[0], obj[arrayOfKeys[1]] || null],
            [...res[1], obj[arrayOfKeys[2]] || null]
        ], result)

    } else if (typeof data === "object") {

        if (arrayOfKeys.length < 2) {
            console.debug(GetInfoMsg("Invalid arrayOfKeys for 'array' data"));
            return result;
        };

        result = data[arrayOfKeys[0]]?.reduce((res, arr) => [
            [...res[0], arr[0] || null],
            [...res[1], arr[1] || null]
        ], result)
    };

    console.debug(GetInfoMsg("Data is filtered. Now checking it"))

    result = CheckAndFilterData(result);

    console.debug(GetInfoMsg("Data is ready"))

    console.debug(result);

    return result;
};