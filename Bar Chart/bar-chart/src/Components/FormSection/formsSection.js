import GetFieldsList from "../Filler/getFieldsList";
import GetJSONsList from "../Filler/getJSONsList";
import './formSection.css';


export default function formsSection (obj) {

    return (
        <div id="user-select">
            <GetJSONsList data={obj.links} />
            <GetFieldsList data={obj.items} />
        </div>
    )


}