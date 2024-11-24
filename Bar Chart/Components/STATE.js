import { DATA } from './DATA';

export default {
    dataLink :  DATA.default.link,
    selectedJson : "default",
    selectedJsonFile : Object.keys(DATA).map(key => [key, DATA[key]["select-name"]]),
    fieldsToSelect : DATA.default.fields,
    selectedField: DATA.default.fields[0],
    datas: []
}