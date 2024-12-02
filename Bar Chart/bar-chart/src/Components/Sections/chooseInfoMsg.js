export default function chooseInfoMsg ({icon, selected, values, disabled, onChange}) {
    return (
        <details disabled={disabled} name="user-choice">
                <summary>{icon} Choose data for info (Like last updated and etc)</summary>
                <select value={selected} id="info-msg" onChange={onChange}>
                        {
                            values?.map(([key, value]) => <option value={key} key={crypto.randomUUID()}>{value}</option>)
                        }
                </select>
        </details>
    );
}