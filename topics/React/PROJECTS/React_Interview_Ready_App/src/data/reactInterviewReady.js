export const reactInterviewTopics = [
  {
    id: 'fundamentals',
    title: 'React Fundamentals',
    summary: 'JSX, components, props, state, events, conditional rendering, and lists.',
    mustKnow: [
      'JSX is syntax sugar for React element creation.',
      'Props are read-only inputs from parent to child.',
      'State is mutable component data managed by React.',
      'Keys help React identify list items during reconciliation.',
    ],
    beginnerQuestions: [
      {
        question: 'What is the difference between props and state?',
        answer: 'Props are passed from parent to child and should not be changed by the child. State belongs to a component and changes through setters.',
      },
      {
        question: 'Why do lists need keys?',
        answer: 'Keys give React a stable identity for each item so it can update, insert, and remove list elements efficiently.',
      },
    ],
    advancedQuestions: [
      {
        question: 'Why should keys not usually be array indexes?',
        answer: 'Indexes become unstable when items are inserted, removed, or reordered, which can cause incorrect DOM reuse and state bugs.',
      },
      {
        question: 'What causes a React component to re-render?',
        answer: 'State updates, prop changes, parent re-renders, context updates, or external store updates can cause a render.',
      },
    ],
    scenario: 'You render a todo list and editing one row changes another row after sorting. What do you check first?',
    approach: 'Check whether the list uses stable ids as keys. If array indexes are used, replace them with a unique todo id.',
    code: `function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}`,
  },
  {
    id: 'state',
    title: 'State Management',
    summary: 'useState, useReducer, derived state, lifting state up, Context, and Redux.',
    mustKnow: [
      'Keep state as close as possible to where it is used.',
      'Avoid duplicating derived state when it can be calculated from existing state.',
      'Use useReducer when updates are action-driven or state transitions are complex.',
      'Use Context for shared values, not as a default replacement for every state variable.',
    ],
    beginnerQuestions: [
      {
        question: 'What does lifting state up mean?',
        answer: 'Moving shared state to the nearest common parent so multiple children can read or update it through props.',
      },
      {
        question: 'When is useReducer useful?',
        answer: 'It is useful when several actions update related pieces of state or the next state depends on the previous state.',
      },
    ],
    advancedQuestions: [
      {
        question: 'How do you avoid unnecessary global state?',
        answer: 'Keep local UI state local, lift only shared state, and use global stores for cross-page or cross-feature state.',
      },
      {
        question: 'Why can derived state be risky?',
        answer: 'Duplicated derived values can get out of sync. Prefer calculating them during render or memoizing expensive calculations.',
      },
    ],
    scenario: 'A filter input and product grid live in different components. Where should the filter state go?',
    approach: 'Place the filter state in their common parent, pass the value to the input, and pass filtered data or filter criteria to the grid.',
    code: `function ProductsPage({ products }) {
  const [query, setQuery] = useState('');
  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <SearchBox value={query} onChange={setQuery} />
      <ProductGrid products={visibleProducts} />
    </>
  );
}`,
  },
  {
    id: 'hooks',
    title: 'Hooks',
    summary: 'useEffect, useMemo, useCallback, useRef, useLayoutEffect, and custom hooks.',
    mustKnow: [
      'Hooks must be called at the top level of React functions.',
      'useEffect runs after render and can clean up previous work.',
      'useRef stores mutable values without causing renders.',
      'Custom hooks share reusable stateful logic.',
    ],
    beginnerQuestions: [
      {
        question: 'What is the purpose of useEffect?',
        answer: 'useEffect runs side effects such as fetching data, subscriptions, timers, or syncing with browser APIs.',
      },
      {
        question: 'What is a custom hook?',
        answer: 'A custom hook is a function starting with use that combines hooks into reusable logic.',
      },
    ],
    advancedQuestions: [
      {
        question: 'What is a stale closure?',
        answer: 'A stale closure happens when a callback or effect reads an old value because dependencies or update patterns are wrong.',
      },
      {
        question: 'When should you avoid useCallback?',
        answer: 'Avoid it when the function is cheap and not passed to memoized children or dependency-sensitive hooks.',
      },
    ],
    scenario: 'A timer keeps using an old count value. How do you fix it?',
    approach: 'Use a functional state update or keep the latest value in a ref, depending on what the interval needs.',
    code: `useEffect(() => {
  const id = setInterval(() => {
    setCount((current) => current + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);`,
  },
  {
    id: 'effects-data',
    title: 'Effects and Data Fetching',
    summary: 'Fetching, loading states, cleanup, race conditions, retries, and API errors.',
    mustKnow: [
      'Always model loading, success, and error states.',
      'Ignore or cancel stale responses when inputs change quickly.',
      'Do not make the effect callback itself async; define an inner async function.',
      'Cleanup prevents memory leaks and outdated updates.',
    ],
    beginnerQuestions: [
      {
        question: 'Why do we need loading and error states?',
        answer: 'They let the UI communicate request progress and failure instead of showing blank or misleading data.',
      },
      {
        question: 'Why should useEffect return a cleanup function?',
        answer: 'Cleanup stops subscriptions, timers, requests, or stale updates when dependencies change or the component unmounts.',
      },
    ],
    advancedQuestions: [
      {
        question: 'How do you prevent race conditions in fetching?',
        answer: 'Use AbortController, request ids, or an ignore flag so older responses cannot overwrite newer state.',
      },
      {
        question: 'How would you improve repeated fetching across pages?',
        answer: 'Use a query/cache library, centralize request logic, dedupe requests, and cache by query key.',
      },
    ],
    scenario: 'A user types quickly in search and old results replace newer results.',
    approach: 'Abort the previous request or ignore stale responses when the search query changes.',
    code: `useEffect(() => {
  const controller = new AbortController();

  async function loadResults() {
    const response = await fetch('/api/search?q=' + query, {
      signal: controller.signal,
    });
    setResults(await response.json());
  }

  loadResults().catch((error) => {
    if (error.name !== 'AbortError') setError(error.message);
  });

  return () => controller.abort();
}, [query]);`,
  },
  {
    id: 'forms',
    title: 'Forms and Validation',
    summary: 'Controlled inputs, uncontrolled inputs, validation, debounce, refs, and submit flow.',
    mustKnow: [
      'Controlled inputs keep form values in React state.',
      'Uncontrolled inputs keep values in the DOM and read them with refs.',
      'Validation can happen on change, blur, submit, or server response.',
      'Debounce expensive validation and search requests.',
    ],
    beginnerQuestions: [
      {
        question: 'What is a controlled input?',
        answer: 'An input whose value is driven by React state and updated through onChange.',
      },
      {
        question: 'What is form validation?',
        answer: 'Validation checks whether input data meets rules before it is accepted or submitted.',
      },
    ],
    advancedQuestions: [
      {
        question: 'How do you handle server validation errors?',
        answer: 'Map field errors to individual fields and keep a form-level error for cross-field or API failures.',
      },
      {
        question: 'How do you keep large forms performant?',
        answer: 'Split sections, localize field state, debounce heavy validation, and avoid updating unrelated fields.',
      },
    ],
    scenario: 'Email validation calls an API on every keystroke and the page feels slow.',
    approach: 'Debounce the email value and call the API only after the user pauses typing.',
    code: `const debouncedEmail = useDebounce(email, 500);

useEffect(() => {
  if (!debouncedEmail) return;
  checkEmailAvailability(debouncedEmail);
}, [debouncedEmail]);`,
  },
  {
    id: 'routing',
    title: 'Routing and Navigation',
    summary: 'React Router, dynamic routes, nested routes, redirects, query params, and protected routes.',
    mustKnow: [
      'Routes map paths to components.',
      'Nested routes help model layouts.',
      'Protected routes guard private UI.',
      'Route state can preserve where the user came from.',
    ],
    beginnerQuestions: [
      {
        question: 'What does BrowserRouter do?',
        answer: 'It enables client-side routing using the browser history API.',
      },
      {
        question: 'How do you navigate programmatically?',
        answer: 'Use useNavigate and call navigate with the target path.',
      },
    ],
    advancedQuestions: [
      {
        question: 'How do nested routes improve app structure?',
        answer: 'They let shared layouts render child routes through an outlet and keep page structure aligned with URLs.',
      },
      {
        question: 'How do you handle auth redirects?',
        answer: 'Capture the attempted location, redirect to login, then navigate back after successful login.',
      },
    ],
    scenario: 'A user opens /dashboard directly while logged out. What should happen?',
    approach: 'ProtectedRoute should redirect to login and remember the requested dashboard path.',
    code: `function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
}`,
  },
  {
    id: 'performance',
    title: 'Performance',
    summary: 'Memoization, rendering costs, code splitting, lazy loading, virtualization, and profiling.',
    mustKnow: [
      'Measure before optimizing.',
      'React.memo helps only when props are stable and renders are expensive.',
      'useMemo memoizes values; useCallback memoizes function references.',
      'Virtualize very long lists.',
    ],
    beginnerQuestions: [
      {
        question: 'What is lazy loading?',
        answer: 'Lazy loading loads code only when it is needed, reducing the initial bundle size.',
      },
      {
        question: 'What is React.memo?',
        answer: 'React.memo skips re-rendering a component when its props have not changed.',
      },
    ],
    advancedQuestions: [
      {
        question: 'Why can memoization fail to help?',
        answer: 'If props change every render or the component is cheap, memoization adds overhead without reducing meaningful work.',
      },
      {
        question: 'How would you optimize a table with 10,000 rows?',
        answer: 'Use virtualization, stable row keys, memoized row components, pagination or filtering, and avoid expensive per-row calculations.',
      },
    ],
    scenario: 'Typing in a search box causes a huge list to lag.',
    approach: 'Debounce filtering, memoize filtered results, and virtualize the list if it remains large.',
    code: `const filteredItems = useMemo(() => {
  return items.filter((item) => item.name.includes(query));
}, [items, query]);`,
  },
  {
    id: 'context-redux',
    title: 'Context, Redux, and External Stores',
    summary: 'Provider patterns, store updates, selectors, async actions, and avoiding prop drilling.',
    mustKnow: [
      'Context is good for shared values like theme, auth, and locale.',
      'Redux is useful for complex shared state and predictable updates.',
      'Selectors keep components decoupled from store shape.',
      'Do not put rapidly changing unrelated values in one broad context.',
    ],
    beginnerQuestions: [
      {
        question: 'What problem does Context solve?',
        answer: 'Context avoids passing props through many intermediate components.',
      },
      {
        question: 'What does dispatch do in Redux?',
        answer: 'dispatch sends an action to the store so reducers can calculate the next state.',
      },
    ],
    advancedQuestions: [
      {
        question: 'Why split contexts?',
        answer: 'Splitting contexts reduces unnecessary consumer renders when unrelated values change.',
      },
      {
        question: 'How do async thunks fit into Redux?',
        answer: 'They run async work and dispatch lifecycle actions so the store can track loading, success, and error states.',
      },
    ],
    scenario: 'Changing the theme re-renders many unrelated components.',
    approach: 'Split context values, memoize provider values, and keep theme consumption close to components that need it.',
    code: `const value = useMemo(() => ({
  theme,
  toggleTheme,
}), [theme]);

return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;`,
  },
  {
    id: 'components',
    title: 'Component Design Patterns',
    summary: 'Composition, children, compound components, render props, controlled components, and reusable APIs.',
    mustKnow: [
      'Prefer composition over large configuration objects.',
      'Use children for flexible layout content.',
      'Keep reusable components focused and predictable.',
      'Expose controlled props when parents need ownership of state.',
    ],
    beginnerQuestions: [
      {
        question: 'What is component composition?',
        answer: 'Composition builds larger UI by combining smaller components through props and children.',
      },
      {
        question: 'Why should components be reusable?',
        answer: 'Reusable components reduce duplication and keep behavior consistent across the app.',
      },
    ],
    advancedQuestions: [
      {
        question: 'When would you use compound components?',
        answer: 'Use them when several child components need to coordinate under a shared parent API, such as Tabs and TabPanel.',
      },
      {
        question: 'How do you design a controlled reusable component?',
        answer: 'Accept value and onChange props, keep internal state optional, and make ownership clear.',
      },
    ],
    scenario: 'A modal component is hard to reuse because every screen needs different content.',
    approach: 'Use children and a small prop API for title, open state, close handler, and actions.',
    code: `function Modal({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true">
      <h2>{title}</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}`,
  },
  {
    id: 'testing',
    title: 'Testing React',
    summary: 'Unit tests, integration tests, user-centric assertions, mocks, and async testing.',
    mustKnow: [
      'Test behavior, not implementation details.',
      'Prefer user-visible queries like role, label, and text.',
      'Mock network boundaries, not React internals.',
      'Test loading, error, and success states for async UI.',
    ],
    beginnerQuestions: [
      {
        question: 'What should a component test verify?',
        answer: 'It should verify what the user can see or do, such as rendered text and interactions.',
      },
      {
        question: 'Why avoid testing internal state directly?',
        answer: 'Internal state is an implementation detail; behavior is what matters to users.',
      },
    ],
    advancedQuestions: [
      {
        question: 'How do you test async data fetching UI?',
        answer: 'Mock the request, assert loading state, wait for the final UI, and verify error states separately.',
      },
      {
        question: 'What is the difference between unit and integration tests?',
        answer: 'Unit tests isolate small logic; integration tests verify multiple components or flows working together.',
      },
    ],
    scenario: 'A test passes even though users cannot click the button.',
    approach: 'Query by role and accessible name, then simulate realistic user interaction instead of checking implementation details.',
    code: `render(<SaveButton onSave={handleSave} />);

await user.click(screen.getByRole('button', { name: 'Save' }));

expect(handleSave).toHaveBeenCalled();`,
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    summary: 'Semantic HTML, labels, keyboard support, focus management, and ARIA.',
    mustKnow: [
      'Use semantic HTML before ARIA.',
      'Inputs need accessible labels.',
      'Interactive elements must be keyboard accessible.',
      'Manage focus when opening dialogs or navigating complex UI.',
    ],
    beginnerQuestions: [
      {
        question: 'Why use a button instead of a clickable div?',
        answer: 'A button has built-in keyboard support, semantics, and accessibility behavior.',
      },
      {
        question: 'How do labels help forms?',
        answer: 'Labels connect text to inputs so screen readers and users understand each field.',
      },
    ],
    advancedQuestions: [
      {
        question: 'When should ARIA be used?',
        answer: 'Use ARIA when semantic HTML cannot express the needed state or relationship, and keep it accurate.',
      },
      {
        question: 'How should modal focus work?',
        answer: 'Move focus into the modal, trap focus while open, and return focus to the trigger when closed.',
      },
    ],
    scenario: 'A custom dropdown cannot be used with the keyboard.',
    approach: 'Add button semantics, keyboard handling, focus management, and ARIA attributes, or use a native select if appropriate.',
    code: `<label htmlFor="email">Email</label>
<input id="email" name="email" type="email" />`,
  },
  {
    id: 'errors-security',
    title: 'Errors, Security, and Reliability',
    summary: 'Error boundaries, safe rendering, XSS, auth assumptions, and resilient UI.',
    mustKnow: [
      'Error boundaries catch render-time errors below them.',
      'Never trust client-only auth for protected data.',
      'Avoid dangerouslySetInnerHTML unless content is sanitized.',
      'Handle empty, partial, and failed data states.',
    ],
    beginnerQuestions: [
      {
        question: 'What is an error boundary?',
        answer: 'An error boundary catches rendering errors in its child tree and shows fallback UI.',
      },
      {
        question: 'Why is dangerouslySetInnerHTML risky?',
        answer: 'It can expose the app to XSS if the HTML is not trusted and sanitized.',
      },
    ],
    advancedQuestions: [
      {
        question: 'What errors do error boundaries not catch?',
        answer: 'They do not catch event handler errors, async errors, server-side rendering errors, or errors inside the boundary itself.',
      },
      {
        question: 'How do you make UI resilient to API failures?',
        answer: 'Show retries, fallback states, cached data when safe, and clear error messages without breaking the whole page.',
      },
    ],
    scenario: 'A child widget crashes and the entire page becomes blank.',
    approach: 'Wrap risky feature areas in error boundaries and show a local fallback instead of losing the whole screen.',
    code: `class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <p>Something went wrong.</p>;
    return this.props.children;
  }
}`,
  },
  {
    id: 'modern-react',
    title: 'Modern React and Architecture',
    summary: 'Suspense, lazy loading, server/client boundaries, folder structure, and maintainability.',
    mustKnow: [
      'Code splitting improves initial load time.',
      'Suspense handles pending UI for supported lazy resources.',
      'Separate domain logic from presentation where complexity grows.',
      'Keep folders organized by feature when the app scales.',
    ],
    beginnerQuestions: [
      {
        question: 'What is code splitting?',
        answer: 'Code splitting breaks the bundle into smaller chunks loaded only when needed.',
      },
      {
        question: 'What does React.lazy do?',
        answer: 'React.lazy lets a component be loaded dynamically and rendered inside Suspense.',
      },
    ],
    advancedQuestions: [
      {
        question: 'How do you structure a large React app?',
        answer: 'Group by feature, keep shared primitives separate, colocate tests and styles, and avoid dumping everything into global folders.',
      },
      {
        question: 'What are server/client boundaries?',
        answer: 'They separate what can run on the server from what must run in the browser, especially in frameworks with server components.',
      },
    ],
    scenario: 'The app bundle is large because every route loads at startup.',
    approach: 'Lazy-load route components and wrap route rendering with Suspense fallback UI.',
    code: `const Dashboard = lazy(() => import('./pages/Dashboard'));

function AppRoutes() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}`,
  },
];

export const reactInterviewScenarios = [
  {
    title: 'API data flickers between old and new values',
    response: 'Check effect dependencies, add request cancellation, keep loading state scoped to the request, and prevent stale responses from setting state.',
  },
  {
    title: 'A memoized child still re-renders',
    response: 'Check whether object, array, or function props are recreated on every parent render. Stabilize only the props that matter.',
  },
  {
    title: 'A form loses input values after list reorder',
    response: 'Check keys first. Use stable ids, not array indexes, especially when list rows contain stateful inputs.',
  },
  {
    title: 'The page shows private UI before redirecting',
    response: 'Add an auth-loading state and render a neutral loading screen until the session is known.',
  },
  {
    title: 'A component is becoming too large',
    response: 'Extract presentational sections, move reusable logic into hooks, and keep data fetching or state transitions separate from markup when useful.',
  },
  {
    title: 'Users report keyboard navigation is broken',
    response: 'Audit semantic elements, focus order, labels, and keyboard handlers. Prefer native controls when possible.',
  },
];

export const reactInterviewChecklist = [
  'Explain state ownership before coding.',
  'Mention loading, empty, error, and success states for async UI.',
  'Use stable keys for dynamic lists.',
  'Clean up effects that subscribe, schedule, or request data.',
  'Avoid global state until multiple distant consumers need it.',
  'Measure performance before using memoization heavily.',
  'Use semantic HTML and accessible labels.',
  'Protect private data on the server, not only in React routes.',
];
