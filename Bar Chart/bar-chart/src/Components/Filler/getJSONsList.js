export default function getJSONsList({links, value, onChange}) {
    return (
        <form>
            <label htmlFor="data">View data of </label>
            <select value={value} id="data" onChange={onChange}>
                {
                    links.map(([key, value]) => <option value={key} key={crypto.randomUUID()}>{value}</option>)
                }
                <option value="add link" key={crypto.randomUUID()}>Add link to file...</option>
            </select>
        </form>
    )
}