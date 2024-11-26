export default function getFieldsList({items, value, onChange}) {
    return (
        <form>
            <label htmlFor="field">With field</label>
            <select value={value} id="field" onChange={onChange}>
                {
                    items.map(([key, value], i) => <option value={key} key={crypto.randomUUID()}>{key}</option>)
                }
            </select>
        </form>
    )
}