import GetInfoMsg from "../Filler/getInfoMsg";

export default function checkAndFilterData (arrOfTwoArrays, INVALID) {

    console.debug(GetInfoMsg("The data was received for verification"))
    
    let res = [[], []];
    
    if (arrOfTwoArrays?.length !== 2) {
        console.debug(GetInfoMsg("The data isn't valid"))
        return res;
    };

    console.debug(GetInfoMsg("The data successfully checked by length for start verification"))

    // if first and second arrays has different length, slice by shortest array

    let minLength = arrOfTwoArrays[0].length > arrOfTwoArrays[1].length 
        ? arrOfTwoArrays[1].length
        : arrOfTwoArrays[0].length

    for (let i = 0; i < minLength; i++) {
        if ([arrOfTwoArrays[0][i], arrOfTwoArrays[1][i]]?.every(x => x !== INVALID)) {
            res[0].push(arrOfTwoArrays[0][i]);
            res[1].push(arrOfTwoArrays[1][i]);
        }
    }
    let countInvalidData = arrOfTwoArrays[0].length - res[0].length;
    if (countInvalidData !== 0) {
        console.debug(GetInfoMsg(`The data was checked and filtered ${countInvalidData} of ${arrOfTwoArrays[0].length}`));
        console.debug(GetInfoMsg(`Current size is ${res[0].length}. It's send for next step`));
    } else {
        console.debug(GetInfoMsg(`The data was checked succesfully and all data is valid`));
    }
    console.debug(res);
    
    return res;
}