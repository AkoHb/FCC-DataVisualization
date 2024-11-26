import GetInfoMsg from "../Filler/getInfoMsg";
import IsValidURL from "./isValidURL";

export default async function loadData (link) {
    
    console.debug(GetInfoMsg("Get link and try to load data"));
    
    if (!IsValidURL(link)) {
        console.log(GetInfoMsg('Link failed validation check'));
        return null;
    };
    
    console.debug(GetInfoMsg('Link successfully validated'));

    try {

        const data = await tryLoadData(link);
        
        return data;

    } catch (error) {
        
        console.error(error);
        
        return null;
    }
}

async function tryLoadData (link) {
    
    try {
        const response  = await fetch(`${link}`);
    
        if (!response.ok) {
            throw new Error("---During loading data something went wrong--- \n---Please try again after few minutes---");
        }
        
        console.log(GetInfoMsg("Data is loaded"))
        const data = await response.json();
        return data;
        
    } catch(e){
        console.error(e);
        console.log("---Link is not valid to load data--- \n---Please, check it---");
    }

  };