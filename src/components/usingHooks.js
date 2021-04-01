import React, { useState, useEffect } from "react";

// Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.
// Only call Hooks from React function components. 

// Functional component using state by the use of hooks (useState and useEffect hooks)
const CountClicks = (props) => {
  //useState(initial state) returns 2 elements: state and function to change state
  const [count, setCount] = useState(0); //setcount() will cause component to rerender (like setState in class component)

  // useEffect replaces componentDidMount, ComponentWillUpdate and componentWillUnmount
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    console.log("Now render method was run")
    return () => { console.log("Now we clean up before unmounting")};
  },[]); //remove the empty array (second parameter) to see that both console.log runs at every render. Empty array never changes so callback in useEffect is only called on mounting and returned function is only called on unmounting.
  // useState and useEffect() can be called multiple times in a component.

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

// const jokeFetcher = async () => {
//     const url = 'https://sv443.net/jokeapi/category/programming';
//     const joke = await fetch(url).then(res=>res.json()).then(data=>data);
//     return joke;
//   }
  
  const Joke = (props) => {
    const url = 'https://sv443.net/jokeapi/category/programming';
    const [joke, changeJoke] = useState({setup:'joke text',delivery:'joke punchline'});
    useEffect(() => {
        fetch(url).then(res=>res.json())
        .then((data)=>{
          // console.log(data);
          changeJoke(data);
        });
        // jokeFetcher().then(joke=>changeJoke(joke));
    },[]);
    return (
        <div>
            {joke.joke}
            {joke.setup && 
            <div>{joke.setup} 
              <button onClick={(event)=>event.target.innerText = joke.delivery }>Click to get punchline</button>
            </div>}
        </div>
    );
};
export {Joke, CountClicks};
export default CountClicks;

