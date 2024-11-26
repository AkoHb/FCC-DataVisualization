export default function produceSize({full, diff}) {
    console.log([full, diff])
    switch(true) {
        case diff.endsWith("%") && diff.length <= 4:
            console.log(eval(`${full}${diff}`));
            return `88`;
            
        default:
            console.log(`${full}-${diff}`);
            return `${full}-${diff}`
    }
}