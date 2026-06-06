export const topicInterviewQuestions = [
  {
    title: 'State Management',
    description: 'Questions around local state, reducers, context, and Redux.',
    beginner: [
      {
        question: 'What is state in React?',
        answer: 'State is component data that can change over time and causes React to re-render when updated.',
      },
      {
        question: 'When should you use useState?',
        answer: 'Use useState for simple component-level values like inputs, toggles, counters, and UI flags.',
      },
    ],
    advanced: [
      {
        question: 'How do you decide between useReducer, Context, and Redux?',
        answer: 'Use useReducer for complex local transitions, Context for shared app values, and Redux for large shared state with predictable updates and tooling.',
      },
      {
        question: 'How do selectors improve Redux usage?',
        answer: 'Selectors isolate state shape, keep components focused, and can be memoized to reduce unnecessary recalculation.',
      },
    ],
  },
  {
    title: 'React Hooks',
    description: 'Questions about hook rules, effects, memoization, refs, and custom hooks.',
    beginner: [
      {
        question: 'What are React hooks?',
        answer: 'Hooks are functions that let function components use React features like state, effects, refs, and context.',
      },
      {
        question: 'What are the rules of hooks?',
        answer: 'Call hooks only at the top level of React components or custom hooks, not inside loops, conditions, or nested functions.',
      },
    ],
    advanced: [
      {
        question: 'How do you avoid stale closures in hooks?',
        answer: 'Use correct dependency arrays, functional state updates, refs for mutable values, or restructure logic so callbacks read current data safely.',
      },
      {
        question: 'When can useMemo or useCallback be harmful?',
        answer: 'They add overhead and complexity when the computed value is cheap or child renders are not actually a bottleneck.',
      },
    ],
  },
  {
    title: 'Forms',
    description: 'Questions about controlled inputs, refs, validation, and form performance.',
    beginner: [
      {
        question: 'What is a controlled component?',
        answer: 'A controlled component stores form input values in React state and updates them through onChange handlers.',
      },
      {
        question: 'What is an uncontrolled component?',
        answer: 'An uncontrolled component lets the DOM keep the input value and reads it through refs when needed.',
      },
    ],
    advanced: [
      {
        question: 'How do you reduce re-renders in large forms?',
        answer: 'Split form sections, keep state close to fields, debounce expensive validation, and avoid updating unrelated fields.',
      },
      {
        question: 'How should async form validation be handled?',
        answer: 'Debounce requests, cancel or ignore stale responses, show pending state, and validate again on submit.',
      },
    ],
  },
  {
    title: 'Routing and Authentication',
    description: 'Questions about React Router, redirects, protected routes, and auth state.',
    beginner: [
      {
        question: 'What does React Router do?',
        answer: 'React Router maps URLs to components and lets users navigate without full page reloads.',
      },
      {
        question: 'What is a protected route?',
        answer: 'A protected route checks authentication before rendering private content and redirects users who are not logged in.',
      },
    ],
    advanced: [
      {
        question: 'How do you preserve the page a user wanted before login?',
        answer: 'Store the attempted location in router state and navigate back to it after successful authentication.',
      },
      {
        question: 'What auth state should be trusted on the client?',
        answer: 'Client state is useful for UI decisions, but protected API data must still be validated by the server.',
      },
    ],
  },
];

export const pageInterviewQuestions = {
  game: {
    title: 'Tic-Tac-Toe Component Questions',
    description: 'Redux and game-state questions for this component.',
    beginner: [
      {
        question: 'Why does this component use useSelector?',
        answer: 'useSelector reads the exact Redux state values the UI needs, such as board, current player, winner, and scores.',
      },
      {
        question: 'Why are buttons disabled after a move?',
        answer: 'Disabling filled cells prevents invalid moves and keeps the UI aligned with the game rules.',
      },
    ],
    advanced: [
      {
        question: 'Where should win detection logic live?',
        answer: 'It should live in reducer/domain logic so the UI only renders state and dispatches user actions.',
      },
      {
        question: 'How would you add redo support?',
        answer: 'Store past, present, and future board states; undo moves present into future, redo moves future back into present.',
      },
    ],
  },
  hooks: {
    title: 'Hooks Component Questions',
    description: 'Interview questions tied to the Hooks Demo component.',
    beginner: [
      {
        question: 'Why does useEffect update the document title?',
        answer: 'It demonstrates a side effect because document.title is outside React rendering.',
      },
      {
        question: 'Why use useRef for focusing an input?',
        answer: 'useRef stores a DOM reference without causing a re-render when the reference changes.',
      },
    ],
    advanced: [
      {
        question: 'Why does useLayoutEffect run before paint?',
        answer: 'It runs synchronously after DOM updates and before the browser paints, which helps with layout reads or visual corrections.',
      },
      {
        question: 'How would you extract a custom hook from repeated logic?',
        answer: 'Move reusable state and effects into a function starting with use, then return only the values and handlers consumers need.',
      },
    ],
  },
  forms: {
    title: 'Forms Component Questions',
    description: 'Questions about controlled, uncontrolled, validation, and debounced inputs.',
    beginner: [
      {
        question: 'Why does the controlled form use value and onChange?',
        answer: 'value displays React state and onChange keeps state updated as the user types.',
      },
      {
        question: 'Why does the uncontrolled form use refs?',
        answer: 'Refs allow the submit handler to read DOM values without storing every field in React state.',
      },
    ],
    advanced: [
      {
        question: 'How would you prevent stale validation errors?',
        answer: 'Clear field-specific errors when the field changes and revalidate on submit or after debounced changes.',
      },
      {
        question: 'How would you handle server-side validation errors?',
        answer: 'Map server errors to field names, display them near inputs, and keep a form-level error for cross-field failures.',
      },
    ],
  },
  login: {
    title: 'Login Component Questions',
    description: 'Authentication flow questions for the login screen.',
    beginner: [
      {
        question: 'Why does the login form use controlled inputs?',
        answer: 'Controlled inputs make it easy to submit the current email and password values and reset or validate them.',
      },
      {
        question: 'What does loading state do here?',
        answer: 'It disables duplicate submissions and gives feedback while authentication is running.',
      },
    ],
    advanced: [
      {
        question: 'How would you protect against duplicate login requests?',
        answer: 'Disable submit while loading, ignore repeat submits, and optionally cancel or serialize auth requests.',
      },
      {
        question: 'How should tokens be stored securely?',
        answer: 'Prefer secure, httpOnly cookies for sensitive tokens; avoid exposing long-lived secrets to JavaScript.',
      },
    ],
  },
  dashboard: {
    title: 'Dashboard Component Questions',
    description: 'Protected route and authenticated UI questions for the dashboard.',
    beginner: [
      {
        question: 'Why is Dashboard behind a ProtectedRoute?',
        answer: 'It contains authenticated content, so users should log in before seeing it.',
      },
      {
        question: 'Why does logout navigate to Login?',
        answer: 'After clearing auth state, the user should be moved away from protected content.',
      },
    ],
    advanced: [
      {
        question: 'How would you avoid flashing protected content?',
        answer: 'Track an auth-loading state and render a loading screen until the session is confirmed.',
      },
      {
        question: 'How would this dashboard fetch private data safely?',
        answer: 'Call protected APIs with authenticated credentials and handle 401 responses by clearing auth state and redirecting.',
      },
    ],
  },
};
