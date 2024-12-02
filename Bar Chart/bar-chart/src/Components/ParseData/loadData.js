import GetInfoMsg from "../Filler/getInfoMsg";
import IsValidURL from "./isValidURL";
import STATE from "../state";

export default async function loadData (link) {
    
    console.debug(GetInfoMsg("Get link and try to load data"));
    
    if (!IsValidURL(link)) {
        console.log(GetInfoMsg('Link failed validation check'));
        return null;
    };
    
    console.debug(GetInfoMsg('Link successfully validated'));

    // Retry logic
    for (let attempt = 1; attempt <= STATE.retriesLoadData; attempt++) {
        try {
            const data = await tryLoadData(link, STATE.abortControllerTimeout);
            return data;  // Return data if successful
        } catch (error) {
            console.error(error);
            if (attempt === STATE.retriesLoadData) {
                return null;  // Return null after the final retry attempt
            }
            console.log(GetInfoMsg(`Retrying... (${attempt}/${STATE.retriesLoadData})`));
        }
    }
}

async function tryLoadData(link, timeout) {
    const controller = new AbortController();
    const signal = controller.signal;

    // Start a timeout to abort the fetch request after a certain time
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(link, { signal });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(GetInfoMsg("During loading data something went wrong\nPlease try again after a few minutes"));
        }

        console.log(GetInfoMsg("Data is loaded"));
        const data = await response.json();
        return data;

    } catch (error) {
        clearTimeout(timeoutId); // Ensure to clear the timeout if the fetch fails
        if (error.name === 'AbortError') {
            console.log(GetInfoMsg("Request timed out\nPlease try again later"));
        } else {
            console.error(GetInfoMsg("Error loading data\nPlease, check the link"), error);
        }
        throw error;  // Re-throw error to handle it in loadData function
    }
}