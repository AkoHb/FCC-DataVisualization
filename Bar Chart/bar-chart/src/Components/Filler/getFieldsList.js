export default function getFieldsList({data}) {
    return (
        <form>
            <label htmlFor="field">With field</label>
            <select value={data.value} id="field" onChange={data.onChange}>
                {
                    data.items.map(([key, value], i) => <option value={key} key={crypto.randomUUID()}>{key}</option>)
                }
            </select>
        </form>
    )
}