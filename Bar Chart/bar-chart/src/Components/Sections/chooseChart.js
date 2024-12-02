export default function chooseChart ({icon, disabled, onChange}) {
    
    const chartTypes = [
        ["bar-chart", "bar", " Bar"],     // [id, value, name ] ==> name insert with one space at beginning
        ["scatterplot-graph", "scatterplot", " Scatterplot graph"],     
        ["heat-map", "heat", " Heat map"],     
        ["choropleth-map", "choropleth", " Choropleth map"],     
        ["treemap-diagramm", "treemap", " Treemap diagramm"],     
    ];

    return (
        <details disabled={disabled} name="user-choice">
            <summary>{icon} Choose chart type</summary>
            <div id="chart-types">
                {
                    chartTypes.map((arr, i) => {
                        const [id, value, name] = arr;

                        return (
                            <div>
                                <input 
                                    type = "radio" 
                                    id = {id} 
                                    name = "chart-type" 
                                    value = {value} 
                                    onChange = {onChange}
                                    key={crypto.randomUUID()}
                                />
                                <label for={id}>{name}</label>
                            </div>
                        )
                    })
                }
            </div>
        </ details>
    )
}