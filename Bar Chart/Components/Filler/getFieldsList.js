export default function getFieldsList ({list}) {
    return (
        <form>
            <label for="field">With field</label>
            <select name="field-data" id="field">
                {
                    list.map(([key, value]) => <option value={value}>{key}</option>)
                }
            </select>
        </form>
    )
}