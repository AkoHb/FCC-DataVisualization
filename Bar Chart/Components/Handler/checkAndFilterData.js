export default function checkAndFilterData (arrOfTwoArrays, INVALID) {
    
    let res = [[], []];
    
    if (arrOfTwoArrays.length !== 2) return res;

    // if first and second arrays has different length, slice by shortest array

    let minLength = arrOfTwoArrays[0].length > arrOfTwoArrays[1].length 
        ? arrOfTwoArrays[1].length
        : arrOfTwoArrays[0].length

    for (let i = 0; i < minLength; i++) {
        if ([arrOfTwoArrays[0][i], arrOfTwoArrays[1][i]].every(x => x !== INVALID)) {
            res[0].push(arrOfTwoArrays[0][i]);
            res[1].push(arrOfTwoArrays[1][i]);
        }
    }
    console.log(res);
    
    return res
}