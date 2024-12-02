import GetInfoMsg from "../Filler/getInfoMsg";


// add placeholder to catch info data, like last updated and etc

const INFOMSG = ["from", "to", "updated", "description"];

function getFields({data}) {

/* 
    Object was holds few keys, and as value - array with data (where key = displayed name into option section), value = node into data

    result = {
        numeric :    [[Count per million, countPerBillion],... ]
        nonNumeric : [[Country, country],... ]
        info:        [[Last updated, last_updated]]
    }

*/
    let res = {
        numeric :    [ ],
        nonNumeric : [ ],
        info:        [ ],
    }

    if (!data) {
        console.debug(GetInfoMsg("Data is null or undefined"));
        return res;
    };

    let dataFields = [];
    // at first, we need to separate full data by types
    if (typeof data === "object") {
        
        dataFields = Object.keys(data);

    } else if (Array.isArray(data)) {

        dataFields = Object.keys(data[0]);
        // now we get all keys of object and add their 

    } else {
        console.debug(GetInfoMsg("This data type isn't supported yet. We can update it later. (Common: Array and Object)"))
    }
    
}