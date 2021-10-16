/**
 * Created by tha on 23-10-2017.
 */
 import React, {useState} from "react"

 const redborder = {
     border: '2px solid red',
     width: '400px',
     margin: '5px'
 }
 
 const parentborder = {
     border: '2px solid green',
     width: '414px'
 }
 
 const blueborder = {
     border: '2px solid blue',
     width: '400px',
     margin: '5px'
 }
 
 const StateDemo = () => {
     const [state, setState] = useState({});
     const update =(event)=>{
         const id = event.target.id;
         const val = event.target.value;
         setState({...state,[id]:val});
     }
     // const render = () => {
         return(<div style={parentborder}>
             <h2>Parent componet holding the state</h2>
             <InputComp update={update}></InputComp>
             <ShowComp name={state.name} desc={state.desc}></ShowComp>
         </div>);
     // }
 }
 
 const InputComp = (props) => {
     return (<div style={redborder}>
         <input type="text" id="name" onChange={props.update} placeholder="write name"/>
         <input type="text" id="desc" onChange={props.update} placeholder="write description"/>
     </div>);
 }
 
 const ShowComp = (props) => {
     return <div style={blueborder}>Show content:
         <p>NAME: {props.name}</p>
         <p>DESC: {props.desc}</p>
     </div>
 }
 
 export default StateDemo;
 