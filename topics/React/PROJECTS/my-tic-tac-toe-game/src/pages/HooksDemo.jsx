import { useState, useEffect, useReducer, useCallback, useMemo, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementAsync } from '../store/slices/counterSlice';
import useLocalStorage from '../hooks/useLocalStorage';
import useDebounce from '../hooks/useDebounce';
import useToggle from '../hooks/useToggle';

/**
 * HOOKS DEMO PAGE - Interview Topic: All React Hooks
 * Demonstrates: All built-in hooks + custom hooks with examples
 */
function HooksDemo() {
  // 1. useState - Interview: Basic state management
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 2. useEffect - Interview: Side effects
  useEffect(() => {
    document.title = `Count: ${count}`;
    return () => {
      document.title = 'React App';
    };
  }, [count]);

  // 3. useReducer - Interview: Complex state logic
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'increment': return { count: state.count + 1 };
        case 'decrement': return { count: state.count - 1 };
        default: return state;
      }
    },
    { count: 0 }
  );

  // 4. useCallback - Interview: Memoized callbacks
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  // 5. useMemo - Interview: Memoized values
  const expensiveValue = useMemo(() => {
    return count * 2;
  }, [count]);

  // 6. useRef - Interview: DOM refs and mutable values
  const inputRef = useRef(null);

  // 7. useLayoutEffect - Interview: Synchronous effects
  useLayoutEffect(() => {
    console.log('Layout effect runs before paint');
  }, []);

  // 8. Redux hooks
  const reduxCount = useSelector(state => state.counter.value);
  const reduxDispatch = useDispatch();

  // 9. Custom hooks
  const [name, setName] = useLocalStorage('name', '');
  const debouncedText = useDebounce(text, 500);
  const [isVisible, toggleVisible] = useToggle(false);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="hooks-demo-page">
      <h1>React Hooks Demo 🪝</h1>

      {/* useState Demo */}
      <section className="hook-section">
        <h2>1. useState</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <pre>const [count, setCount] = useState(0)</pre>
      </section>

      {/* useEffect Demo */}
      <section className="hook-section">
        <h2>2. useEffect</h2>
        <p>Check document title - it updates with count!</p>
        <p>useEffect runs after every render (check console)</p>
        <pre>{'useEffect(() => {}, [dependencies])'}</pre>
      </section>

      {/* useReducer Demo */}
      <section className="hook-section">
        <h2>3. useReducer</h2>
        <p>Reducer Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <pre>const [state, dispatch] = useReducer(reducer, initialState)</pre>
      </section>

      {/* useCallback Demo */}
      <section className="hook-section">
        <h2>4. useCallback</h2>
        <button onClick={handleClick}>Memoized Callback</button>
        <pre>{'const memoizedFn = useCallback(() => {}, [])'}</pre>
      </section>

      {/* useMemo Demo */}
      <section className="hook-section">
        <h2>5. useMemo</h2>
        <p>Count × 2 = {expensiveValue}</p>
        <pre>{'const memoizedValue = useMemo(() => computation, [deps])'}</pre>
      </section>

      {/* useRef Demo */}
      <section className="hook-section">
        <h2>6. useRef</h2>
        <input ref={inputRef} placeholder="Focus me!" />
        <button onClick={focusInput}>Focus Input</button>
        <pre>const ref = useRef(initialValue)</pre>
      </section>

      {/* Redux Hooks Demo */}
      <section className="hook-section">
        <h2>7. Redux Hooks (useSelector, useDispatch)</h2>
        <p>Redux Count: {reduxCount}</p>
        <button onClick={() => reduxDispatch(increment())}>+</button>
        <button onClick={() => reduxDispatch(decrement())}>-</button>
        <button onClick={() => reduxDispatch(incrementAsync(5))}>+5 Async</button>
      </section>

      {/* Custom Hooks Demo */}
      <section className="hook-section">
        <h2>8. Custom Hooks</h2>
        
        <div>
          <h3>useLocalStorage</h3>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Saved to localStorage"
          />
          <p>Stored name: {name}</p>
        </div>

        <div>
          <h3>useDebounce</h3>
          <input 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Type to see debounce"
          />
          <p>Debounced (500ms): {debouncedText}</p>
        </div>

        <div>
          <h3>useToggle</h3>
          <button onClick={toggleVisible}>Toggle</button>
          {isVisible && <p>Visible content!</p>}
        </div>
      </section>

      {/* Interview Notes */}
      <section className="interview-notes">
        <h2>🎯 Hook Interview Topics</h2>
        <ul>
          <li><strong>Rules of Hooks:</strong> Top level, React functions only</li>
          <li><strong>useState:</strong> Simple state management</li>
          <li><strong>useEffect:</strong> Side effects, cleanup</li>
          <li><strong>useReducer:</strong> Complex state logic</li>
          <li><strong>useCallback:</strong> Memoize functions</li>
          <li><strong>useMemo:</strong> Memoize values</li>
          <li><strong>useRef:</strong> DOM refs, mutable values</li>
          <li><strong>Custom Hooks:</strong> Reusable logic</li>
        </ul>
      </section>
    </div>
  );
}

export default HooksDemo;

// Made with Bob
