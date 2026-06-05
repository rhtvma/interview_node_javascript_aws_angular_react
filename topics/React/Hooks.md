# useState
The useState hook allows you to add state to functional components.

      import React, { useState } from 'react';

      function Counter() {
        const [count, setCount] = useState(0);

        return (
          <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
              Click me
            </button>
          </div>
        );
      }


# useEffect
The useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.

      import React, { useEffect, useState } from 'react';

      function Timer() {
        const [count, setCount] = useState(0);

        useEffect(() => {
          const timer = setInterval(() => {
            setCount(prevCount => prevCount + 1);
          }, 1000);

          return () => clearInterval(timer); // Cleanup on unmount
        }, []);

        return <div>Timer: {count}</div>;
      }

# useContext
The useContext hook allows you to use the context API in a simpler way.

      import React, { useContext } from 'react';

      const ThemeContext = React.createContext('light');

      function ThemedButton() {
        const theme = useContext(ThemeContext);

        return <button style={{ background: theme === 'dark' ? '#333' : '#FFF' }}>Themed Button</button>;
      }

# useReducer
The useReducer hook is usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

      import React, { useReducer } from 'react';

      const initialState = { count: 0 };

      function reducer(state, action) {
        switch (action.type) {
          case 'increment':
            return { count: state.count + 1 };
          case 'decrement':
            return { count: state.count - 1 };
          default:
        }
      }
