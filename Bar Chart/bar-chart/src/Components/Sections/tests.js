export default function tests ({icon, onChange}) {
    return (
        <details name="user-choice">
          <summary>{icon} Tests</summary>
          <p>Here you can choose the preset for completing FCC test</p>
          <select onChange={onChange} >
            <option value="default" selected>Possible options below</option>
            <option value="tirst">Bar Chart</option>
            <option value="second">Scatter Plot</option>
            <option value="third">Heat Map</option>
            <option value="fourth">Choropleth</option>
            <option value="fifth">Tree Map</option>
          </select>
        </details>
    )
}