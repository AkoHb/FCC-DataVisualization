import Parchartsett from "./barchartsett";
import ProduceSize from "./produceSize";

export default function getBarChart({data, fullwidth, fullHeight}) {

    if (data === null){
        return <div id="data-error">SVG can't be produced from empty data</div>
    }

    const { width, height, padding, svgBgColor} = Parchartsett; 

    return (
        <svg 
            // width={ProduceSize({ full: fullwidth, diff: width })} 
            width="90%" 
            // height={ProduceSize({ full: fullHeight, diff: height })} 
            height="70%" 
            style={{ padding: `${padding.top} ${padding.right} ${padding.bottom} ${padding.left}`, backgroundColor: svgBgColor }}>
            {/* Example bar: You would replace this with dynamic bar rendering */}
            <rect width="50" height="100" style={{ fill: "blue" }} />
        </svg>
    );

}