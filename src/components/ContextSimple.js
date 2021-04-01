import React, { useState, useEffect, useContext } from "react";

// This context statement could be put in a different file and exported for all to use
const ThemeContext = React.createContext("light");

// when no provider is used then the contexts default value ('light') is used otherwise the value in the provider is used.
const Sample1 = () => (
  // <ThemeContext.Provider value='dark'>
  <ThemeContext.Consumer>
    {theme => <div>Our theme is: {theme}</div>}
  </ThemeContext.Consumer>
  // </ThemeContext.Provider>
);

//###################### More realistic example ###############################
// Here the provider surrounds the component that holds the consumer
const Sample2 = () => (
  <ThemeContext.Provider value="dark">
    <ThemedButton />
  </ThemeContext.Provider>
);

const ThemedButton = props => (
  <ThemeContext.Consumer>
    {theme => <button {...props}>button with theme: {theme}</button>}
  </ThemeContext.Consumer>
);

//######################### Dynamic lifting state up example###################################
const CartContext = React.createContext({
  cart: void 0, // void 0 is equivallent to undefined
  addItem: () => {} // an initiala value for the callback to be used to update the cart value.
});

const products = [
  { id: 1, title: "Fortnite" },
  { id: 2, title: "Doom" },
  { id: 3, title: "Quake" }
];

const CartPage = () => (
  <CartContext.Consumer>
    {({ cart, addItem }) => (
      <React.Fragment>
        <div>
          <h2>Product list</h2>
          {products.map((p,idx) => (
            <button key={idx} onClick={() => addItem(p)} value={p}>
              {p.title}
            </button>
          ))}
        </div>
        <div>
          <h2>Cart</h2>
          {cart.map((item,idx) => (
            <div key={idx}> {item.title} </div>
          ))}
        </div>
      </React.Fragment>
    )}
  </CartContext.Consumer>
);

class CartProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      addItem: item => {
        this.setState({
          cart: [...this.state.cart, { ...item }]
        });
      }
    };
  }
  render() {
    return (
      <CartContext.Provider value={this.state}>
        <CartPage />
      </CartContext.Provider>
    );
  }
}

//######################### getting rid of the surrounding <Consumer> tag on every child that needs context ####################################
// Decorator pattern (I think?) takes a component in and returns a component now with the <Consumer> context available
const withCart = Component => {
  return function fn(props) {
    return (
      <CartContext.Consumer>
        {context => {
          console.log(context);
          return <Component {...props} {...context} />;
        }}
      </CartContext.Consumer>
    );
  };
};

class Header extends React.Component {
  render() {
    const { cart } = this.props;
    console.log(cart);
    return (
      <div>{(cart.length === 0 ) ? <div>Empty cart</div> : <div>Items in cart: ({cart.length})</div> }</div>
    );  
  }
}

class CartProvider2 extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      addItem: item => {
        this.setState({
          cart: [...this.state.cart, { ...item }]
        });
      }
    };
  }
  render() {
    return (
      <CartContext.Provider value={this.state}>
        <HeaderWithCart/>
        <CartPage /> {/* From previos example */}
      </CartContext.Provider>
    );
  }
}

const HeaderWithCart = withCart(Header);

// export default Sample2;
// export default CartProvider;
export default CartProvider2;
