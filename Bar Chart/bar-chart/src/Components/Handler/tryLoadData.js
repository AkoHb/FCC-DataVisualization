async function tryLoadData (link) {
    
    const regToLink = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    let data = {};

    if (!regToLink.test(link)) {
        console.log('Link failed RegExp check......')
        return data;
    };
    
    try {
        const response  = await fetch(`${link}`);
    
        if (!response.ok) {
            throw new Error("---During loading data something went wrong...--- \n---Please try again after few minutes---");
        }
        
        data = await response.json();
        
    } catch(e){
        console.error(e);
        console.log("---Link is not valid to load data...--- \n---Please, check it---");
    }

    return data;
}

export default tryLoadData