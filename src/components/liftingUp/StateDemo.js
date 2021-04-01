/**
 * Created by tha on 23-10-2017.
 */
import React from "react"

export default class StateDemo extends React.Component{
    constructor(){
        super();
        this.state = {name: ''}
    }
    update =(event)=>{
        const name = event.target.value;
        this.setState({name: name});
    }
    render(){
        return(<div className="greenborder">
            <InputComp update={this.update}></InputComp>
            <ShowComp stateName={this.state.name}></ShowComp>
        </div>);
    }
}

const InputComp = () => {
    return (<div className="redborder">
        <input type="text" onChange={this.props.update}/>
    </div>);
}

const ShowComp = () => {
    return <div className="blueborder">Show content:
        {this.props.stateName}
    </div>
}