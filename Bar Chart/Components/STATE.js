import { DATA } from './Data';
console.log("We're into State f")

export default function State () {
    return {
        dataLink :  DATA.default.link,
        selectedJson : "default",
        selectedJsonFile : Object.keys(DATA).map(key => [key, DATA[key]["select-name"]]),
        fieldsToSelect : DATA.default.fields,
        selectedField: DATA.default.fields[0],
        datas: []
    }
}