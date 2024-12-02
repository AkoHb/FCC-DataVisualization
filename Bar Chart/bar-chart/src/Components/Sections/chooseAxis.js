export default function chooseAxis ({icons, selected, values, disabled, onChange}) {
    return (
            <details disabled={disabled} name="user-choice">
                <summary>{icons.main} Choose data for axis or swap it</summary>
                <div id="axis-data">
                    <p>{icons.yIcon} Choose data for Y-axis. It may be numeric data</p>
                    <select value={selected.yAxis} id="y-axis" onChange={onChange.yAxis}>
                            {
                                values.yAxis?.map(([key, value]) => <option value={key} key={crypto.randomUUID()}>{value}</option>)
                            }
                    </select>
                    <p>{icons.xIcon} Choose data for X-axis. It may be non numeric data</p>
                    <select value={selected.xAxis} id="x-axis" onChange={onChange.xAxis}>
                            {
                                values.xAxis?.map(([key, value]) => <option value={key} key={crypto.randomUUID()}>{value}</option>)
                            }
                    </select>
                    <div id="swap-axis"  onChange={onChange.swap}>
                        {icons.swapIcon}
                    </div>
                </div>
            </details>
    )
}