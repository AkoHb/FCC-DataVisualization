import GetInfoMsg from "../Filler/getInfoMsg";


// add placeholder to catch info data, like last updated and etc

const INFOMSG = ["from", "to", "updated", "description"];

function getFields({data}) {

    // Array with fields would contain two arrays
    // fisrt = contain fields names with numeric values
    // second = any, except numeric
    // and third = contain data from INFOMSG keys

    let res = [[], []]

    if (!data) {
        console.debug(GetInfoMsg("Data is null or undefined"));
        return res;
    };

    // at first, we need to separate full data by types
    if (Array.isArray(data)) {

    } else if (typeof data === "object") {

        // now we get all keys of object and add their 




    } else {
        console.debug(GetInfoMsg("This data type isn't supported yet. We can update it later. (Common: Array and Object)"))
    }
    
}