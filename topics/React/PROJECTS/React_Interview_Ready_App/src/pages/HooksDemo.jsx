/**
 * HOOKS DEMO PAGE - Interview Topic: React Hooks
 *
 * Purpose: Demonstrate built-in hooks, custom hooks, and Redux hooks in one page.
 * Interview Points:
 * - useState, useEffect, useReducer, useCallback, useMemo
 * - useRef and useLayoutEffect
 * - Custom hooks and Redux state hooks
 *
 * Interview Questions to Prepare:
 * Q1: When should you use useReducer instead of useState?
 * A: When state logic is complex, actions are related, or updates follow a reducer pattern.
 *
 * Q2: How does useMemo improve performance?
 * A: It memoizes expensive computations and avoids recomputing them on every render.
 *
 * Q3: Why must effect dependencies be accurate?
 * A: Incorrect dependencies can cause stale values or unwanted reruns.
 */
import { useState, useEffect, useReducer, useCallback, useMemo, useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementAsync } from '../store/slices/counterSlice';
import useLocalStorage from '../hooks/useLocalStorage';
import useDebounce from '../hooks/useDebounce';
import useToggle from '../hooks/useToggle';
import InterviewQuestionSet from '../components/interview/InterviewQuestionSet';
import { pageInterviewQuestions } from '../data/interviewBank';

function HooksDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    document.title = `Count: ${count}`;
    return () => {
      document.title = 'React App';
    };
  }, [count]);

  const [state, reducerDispatch] = useReducer(
    (currentState, action) => {
      switch (action.type) {
        case 'increment': return { count: currentState.count + 1 };
        case 'decrement': return { count: currentState.count - 1 };
        default: return currentState;
      }
    },
    { count: 0 }
  );

  const handleClick = useCallback(() => {
    console.log('Memoized callback clicked');
  }, []);

  const expensiveValue = useMemo(() => count * 2, [count]);
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    console.log('Layout effect runs before paint');
  }, []);

  const reduxCount = useSelector(state => state.counter.value);
  const reduxDispatch = useDispatch();

  const [name, setName] = useLocalStorage('name', '');
  const debouncedText = useDebounce(text, 500);
  const [isVisible, toggleVisible] = useToggle(false);

  return (
    <div className="hooks-demo-page">
      <header className="page-header">
        <p className="page-eyebrow">React Hooks</p>
        <h1 className="page-title">Hooks Demo</h1>
        <p className="page-subtitle">
          Practical examples of built-in hooks, Redux hooks, and custom hooks in one place.
        </p>
      </header>

      <section className="hook-section">
        <h2>1. useState</h2>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <pre>const [count, setCount] = useState(0)</pre>
      </section>

      <section className="hook-section">
        <h2>2. useEffect</h2>
        <p>Document title updates when the count changes.</p>
        <pre>{'useEffect(() => {}, [dependencies])'}</pre>
      </section>

      <section className="hook-section">
        <h2>3. useReducer</h2>
        <p>Reducer Count: {state.count}</p>
        <button onClick={() => reducerDispatch({ type: 'increment' })}>+</button>
        <button onClick={() => reducerDispatch({ type: 'decrement' })}>-</button>
        <pre>const [state, dispatch] = useReducer(reducer, initialState)</pre>
      </section>

      <section className="hook-section">
        <h2>4. useCallback and useMemo</h2>
        <p>Count multiplied by 2: {expensiveValue}</p>
        <button onClick={handleClick}>Memoized Callback</button>
        <pre>{'const memoizedValue = useMemo(() => value, [deps])'}</pre>
      </section>

      <section className="hook-section">
        <h2>5. useRef</h2>
        <input ref={inputRef} placeholder="Focus me" />
        <button onClick={() => inputRef.current?.focus()}>Focus Input</button>
        <pre>const ref = useRef(initialValue)</pre>
      </section>

      <section className="hook-section">
        <h2>6. Redux Hooks</h2>
        <p>Redux Count: {reduxCount}</p>
        <button onClick={() => reduxDispatch(increment())}>+</button>
        <button onClick={() => reduxDispatch(decrement())}>-</button>
        <button onClick={() => reduxDispatch(incrementAsync(5))}>+5 Async</button>
      </section>

      <section className="hook-section">
        <h2>7. Custom Hooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">useLocalStorage</h3>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Saved to localStorage"
            />
            <p className="info-text">Stored name: {name || 'None'}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">useDebounce</h3>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type to debounce"
            />
            <p className="info-text">Debounced: {debouncedText || 'Waiting'}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">useToggle</h3>
            <button onClick={toggleVisible}>Toggle</button>
            {isVisible && <p className="info-text">Visible content</p>}
          </div>
        </div>
      </section>

      <section className="interview-notes">
        <h2>Hook Interview Topics</h2>
        <ul>
          <li><strong>Rules of Hooks:</strong> top level and React functions only</li>
          <li><strong>Side effects:</strong> dependencies and cleanup</li>
          <li><strong>Memoization:</strong> useMemo and useCallback</li>
          <li><strong>Custom hooks:</strong> reusable stateful logic</li>
        </ul>
      </section>

      <InterviewQuestionSet {...pageInterviewQuestions.hooks} />
    </div>
  );
}

export default HooksDemo;
