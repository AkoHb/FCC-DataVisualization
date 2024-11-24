export default function getJSONsList({data}) {
    return (
        <form>
            <label htmlFor="data">View data of </label>
            <select value={data.value} id="data" onChange={data.onChange}>
                {
                    data.links.map(([key, value]) => <option value={key} key={crypto.randomUUID()}>{value}</option>)
                }
            </select>
        </form>
    )
}