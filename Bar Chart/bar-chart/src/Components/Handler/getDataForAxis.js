import CheckAndFilterData from "./checkAndFilterData";
import GetInfoMsg from "../Filler/getInfoMsg";

// arrayOfKeys it's a slice of filds data (all except first value) that contain into state.selectedField
// short it looks like state.selectedField.slice(1)
// like full path dataToJsonFiles.default.fields[i].slice(1) 

export default function getDataForAxis (data, arrayOfKeys, INVALID) {
    
    console.debug(GetInfoMsg("Filtering data by selected fields"));
    let xAxis = [];
    let yAxis = [];
    let result = [xAxis, yAxis];

    console.debug(Object.keys(data).length < 1);

    if (Object.keys(data).length < 1) {
        console.debug(GetInfoMsg("The data is empty"));
        return result;
    }

    if (arrayOfKeys.at(-1) === "str") {
        result = data?.reduce((res, obj) => [
            [...res[0], obj[arrayOfKeys[1]] ? obj[arrayOfKeys[1]] : INVALID],
            [...res[1], obj[arrayOfKeys[2]] ? obj[arrayOfKeys[2]] : INVALID]
        ], result)

    } else if (arrayOfKeys.at(-1) === "array") {
        result = data[arrayOfKeys[0]]?.reduce((res, arr) => [
            [...res[0], arr[0] ? arr[0] : INVALID],
            [...res[1], arr[1] ? arr[1] : INVALID]
        ], result)
    };

    console.debug(GetInfoMsg("Data is filtered. Now checking it"))

    result = CheckAndFilterData(result, INVALID);

    console.debug(GetInfoMsg("Data is ready"))

    console.debug(result);

    return result;
};