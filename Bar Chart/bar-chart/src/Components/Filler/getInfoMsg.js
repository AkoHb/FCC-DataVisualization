export default function getInfoMsg(str) {
    return str.split("\n").map(s => `...${s}...`).join("\n")
}