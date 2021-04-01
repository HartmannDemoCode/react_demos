/**
 * Created by tha on 24-10-2019
 * Based on: "https://parastudios.de/modern-and-clean-routing-with-hooks/" and "https://blog.logrocket.com/how-react-hooks-can-replace-react-router/"
 * THIS IS THE EASIEST ROUTER OF THEM AALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL!!!!!!!!!!!!!
 */
import React, {useState, useEffect} from 'react';
import {useRoutes, A, useRedirect, navigate} from 'hookrouter';
import '../css/routing.css';

const products = [
    {number: '101', name: 'Wetsuit', price: 3.00}
    ,{number: '102', name: 'Gloves', price: 5.10}
    ,{number: '103', name: 'Paddlefloat', price: 2.70}
    ,{number: '104', name: 'Pump', price: 3.40}
    ,{number: '105', name: 'Hood', price: 3.70}
];

const routes = {
    '/'         : ()=><Home/>,
    '/about'    : ()=><About/>,
    '/login'    : ()=><Login/>,
    '/dashboard': ()=><DashBoard/>,
    '/products' : ()=><ProductList/>,
    '/products/:id': ({id})=><ProductDetails id={id}/>,
    '/sub*'     : ()=><SubRoutes/>
};
const subRoutes = {
    '/pt1': ()=><div>POINT 1</div>,
    '/pt2': ()=><div>POINT 2</div>,
    '/pt3': ()=><div>POINT 3</div>,
};

const HookRoutingDemo = () => {
    const routeResult = useRoutes(routes);
    
    return (
        <div>
            <Header/>
            {routeResult || <NotFound/>}
        </div>
    );
};

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><A href='/'>Home</A></li>
                <li><A href='/products'>products</A></li>
                <li><A href='/about'>About us</A></li>
                <li><A href='/login'>Test redirect function</A></li>
                <li><A href='/sub'>Test subroutes</A></li>
            </ul>
        </nav>
    </header>
);

const ProductList = () => (
    <div>
        <h2>Our products: </h2>
        <ul>
            {
                products.map(p => (
                    <li key={p.number}>
                        <A href={`/products/${p.number}`}>{p.name}</A>
                    </li>
                ))
            }
        </ul>
    </div>
);

const ProductDetails = (props) => {
    const productsFiltered = products.filter((p)=>p.number === props.id);
    const product = (productsFiltered.length > 0)?productsFiltered[0]:null;
    if (!product) {
        return <div>Sorry, but the product {props.id} was not found</div>
    }
    return (
        <div>
            <h2>Product details:</h2>
            <h3>{product.name} (#{product.number})</h3>
            <h3>Price: {product.price}</h3>
        </div>
    );
}
const DashBoard = () => {
    useRedirect('/myPersonalDashboard','/dashboard');
    return (<div><h1>You are now logged in</h1></div>)
};

const Login = () => {
    const [username,setUsername] = useState('');
    const _login = ()=>{
        //TODO: implement server side login here.
        if(username === 'admin')
            navigate('/dashboard');
        else
            alert('username must be admin');
        setUsername('');
    };

    return (
        <div>
            Enter your user name <input type="text" value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
            <button onClick={_login}>Login</button>
        </div>
    );
}
const SubRoutes = () => {
    const routeResult = useRoutes(subRoutes);
    
    return (
        <div>
            <nav>
            <ul>

            <li><A href="/sub/pt1">PT 1</A></li>
            <li><A href="/sub/pt2">PT 2</A></li>
            <li><A href="/sub/pt3">PT 3</A></li>
            </ul></nav>
            {routeResult || <NotFound/>}
        </div>
    );
}
const Home = () => (
    <div>
        <h1>Welcome to the Webshop!</h1>
    </div>
)

const About = () => (
    <div>
        <h2>Who are we</h2>
        <p>We are a great company that can make all your dreams come true</p>
    </div>
);

const NotFound = () => <div><h1>The ressource you are looking for was not found on the given address</h1></div>
export default HookRoutingDemo;