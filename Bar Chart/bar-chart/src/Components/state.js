import { data as DATA } from './data';

export default function state() {
    return {
        dataLink :  DATA.default.link,
        selectedJson : "default",
        selectedJsonFile : Object.keys(DATA).map(key => [key, DATA[key]["select-name"]]),
        fieldsToSelect : DATA.default.fields,
        selectedField: DATA.default.fields[0],
        isProcessing: false,
        xAxis: null,
        yAxis: null,
        pathNode: " ==> ",
        dataType: "json",                       // it can be JSON, CSV and other, but starts from JSON
        datas: []
    }
}