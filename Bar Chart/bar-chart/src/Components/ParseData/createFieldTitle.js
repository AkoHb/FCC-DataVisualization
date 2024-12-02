import STATE from "../state";
export default function createFieldTitle({key, name}) {

    if (!name || !key) return "";

    const separator = STATE.pathNode;

    const processArray = arr => arr.map(s => processStr(s.replace(/[_\s]/g, " ")))

    switch (key) {
        case "info":
            return Array.isArray(name) 
                ? processArray(name)
                : typeof name === "string" 
                ? processStr(name) 
                : "";

        case "section":
            return Array.isArray(name) 
                ? processStr(name.at(-1)) 
                : typeof name === "string" 
                ? processStr(name) 
                : "";

        case "path":
            return Array.isArray(name) 
                ? name.join(separator) 
                : `${name} ${separator}`;

        default:
            return ""; 
    }
};


const processStr = string => {
    if (!string) return "";

    return string
        .split("")
        .map((ch, i) => i === 0 
            ? ch.toUpperCase() 
            : ch !== ch.toLowerCase() 
            ? ` ${ch.toLowerCase()}` 
            : ch
        )
        .join("");

}