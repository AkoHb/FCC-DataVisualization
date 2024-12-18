export default function changeFileOrLink ({icon, links, value, disabled, insertLink, onChange, onSubmit}) {
    
    
    const updateInputLink = () => {
        let link = document.getElementById("user-added-link").value;
        if (link !== "") {
            onSubmit(link);
            link = ""; 
        }
    };

    return (
        <>
            <details disabled={disabled} name="user-choice" open>
                <summary>{icon} Choose file or insert data link</summary>
                <select value={value} id="data" onChange={onChange.select}>
                    {
                        links.map(([key, value]) => <option value={key} key={crypto.randomUUID()}>{value}</option>)
                    }
                    <option value="add-link" key={crypto.randomUUID()}>Add link to file...</option>
                </select>
                <div id="file-format" style={insertLink ? {display: "block"} : {display: "none"}}>
                    <p>Choose below file's format</p>
                    <div>
                        <input type="radio" id="json" name="format" value="json" checked onChange={(e) => onChange.format(e)}/>
                        <label htmlFor="json"> JSON</label>
                    </div>

                    <div>
                        <input type="radio" id="csv" name="format" value="csv" onChange={(e) => onChange.format(e)} />
                        <label htmlFor="csv"> CSV</label>
                    </div>
                </div>  
                <div id="add-link" style={insertLink ? {display: "block"} : {display: "none"}} >
                    <input type="text" id="user-added-link" placeholder="Inser URL" required></input>
                    <input type="submit" value="Try to load data" onClick={updateInputLink}/>
                </div>
            </details>
        </>

    )
}