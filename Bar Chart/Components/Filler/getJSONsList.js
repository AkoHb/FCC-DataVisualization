export default function getJSONsList ({list}) {
    return (
        <form>
            <label for="data">View data of </label>
            <select name="jsonData" id="data">
                {
                    list.map(([key, value]) => <option value={key}>{value}</option>)
                }
            </select>
        </form>
    )
}