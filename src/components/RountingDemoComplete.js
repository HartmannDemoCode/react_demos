/**
 * Created by tha on 12-10-2017.
 * Based on: "https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf"
 */
import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom'
import dataFacade from '../data/FacadeWithAwait';


import '../css/routing.css';
// import '../css/exam.css';

const RoutingDemo = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Main />
        </div>
    </BrowserRouter>
);
export default RoutingDemo;

const Header = () => (
    <header>
        <nav>
            <ul> 
                <li><Link to='/'>Front page</Link></li>
                <li><Link to='/car'>Cars</Link></li>
                <li><Link to='/carform'>Car Form</Link></li>
            </ul>
        </nav>
    </header>
);

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/car' render={({props})=>(
                <Switch>
                    <Route exact path='/car' component={Cars}/>
                    <Route path='/car/:id' component={CarDetails}/>
                </Switch>    
            )}/>
            <Route path='/carform' render={()=><CarForm dataFacade={dataFacade}/>}/>
        </Switch>
    </main>
);

const Home = () => (
    <div>
        <h1>Routing example</h1>
        <p>This is an example of using routing and nested routes by only using functional components and react hooks for state management.</p>
    </div>
);

const Cars = () => {

    const [cars, setCars] = useState([]);

    useEffect(()=>{
        dataFacade.getCars().then(cars=>setCars(cars));
    },[]);
    
    const deleteCar = (event) => {
        event.preventDefault();
        const id = event.target.id;
        dataFacade.deleteCar(id).then((car)=>console.log(car)); //returns empty object.
        // dataFacade.getCars().then(cars=>setCars([...cars]));

    };
    
    console.log(cars);
    return (
        <div>
        <h2>These are all the cars </h2>
        <ul>
            {
                cars.map(c => (
                    <li key={c.id}>
                    <Link to={`/car/${c.id}`}><span className="tabulator">{c.make}</span> {c.model}</Link>
                    <button id={c.id} onClick={deleteCar}>delete</button>
                </li>
            ))
        }
        </ul>
    </div>
)};

const CarDetails = (props) => {
    const [car, setCar] = useState();
    
    useEffect(()=>{
        dataFacade.getCar(props.match.params.id).then(car=>setCar(car));
    },[]);
   if (!car) {
        return <div>Sorry, but the car no. {props.match.params.id} was not found</div>
    }
    console.log('props',JSON.stringify(props, null,2)); // 3 place is indent=2 (makes it pretty printing)
    return (
        <div>
            <h2>car details:</h2>
            <h3>Car (#{car.id})</h3>
            <img src={car.img}/>
            <h5>Make: {car.make}</h5>
            <h5>Model: {car.model}</h5>
            <h5>Year: {car.year}</h5>
            <button onClick={props.history.goBack}>Go back</button>
        </div>
    );
}

const About = () => (
    <div>
        <h2>The purpose of this web site</h2>
        <p>lorem ipsum bla bla bla</p>
    </div>
);

const CarForm = (props) => {
    const [data, setData] = useState({})
    console.log('data:', data);
    return (
        <div>
            Make <input type="text" onChange={(event)=>setData({...data, make:event.target.value})}/>
            Model <input type="text" onChange={(event)=>setData({...data, model: event.target.value})}/>
            Year <input type="text" onChange={(event)=>setData({...data, year:event.target.value})}/>
            <button onClick={()=>props.dataFacade.createCar(data)}>Create new car</button>
        </div>
    )
}