/**
 * Created by tha on 10-10-2019.
 */
import React, {useState, useEffect} from "react"

export default (props)=>{
    const [name, updateName] = useState(null);
    const update =(event)=>{
        const name = event.target.value;
        updateName(name);
    }
    
    return(<div className="greenborder">
        <InputComp update={update}></InputComp>
        <ShowComp stateName={name}></ShowComp>
    </div>);
    
}

const InputComp = (props)=>{
    return (<div className="redborder">
        <input type="text" onChange={props.update}/>
    </div>);
}

const ShowComp = (props) => {
    return <div className="blueborder">Show content:
        {props.stateName}
    </div>
}