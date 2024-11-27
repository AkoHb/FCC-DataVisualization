import STATE from "../state";
export default function createFieldTitle({key, name}) {

    if (!name || !key) return "";

    const separator = STATE.pathNode;

    if (Array.isArray(name)) {
        return name.reduce((phrase, w) => {
            if (w.includes(separator)) {
                
            } else {
                let c
            }
        }, "");

    } else if (typeof name === 'string') {
        return processStr(name);
    }

    return "";
};


const pro