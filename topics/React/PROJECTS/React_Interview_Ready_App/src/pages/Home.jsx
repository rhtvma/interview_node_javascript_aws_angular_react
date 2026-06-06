/**
 * HOME PAGE - Interview Topic: React Overview
 *
 * Purpose: Summary dashboard for core React topics and candidate practice.
 * Interview Points:
 * - React architecture and core concepts
 * - Topic selection and interview question mapping
 * - Using reusable components and navigation
 *
 * Interview Questions to Prepare:
 * Q1: What are the most important React concepts to review before an interview?
 * A: JSX, state, props, component lifecycle, hooks, context, routing, and performance.
 *
 * Q2: How do you make a reusable page component?
 * A: Keep logic modular, separate data from presentation, and pass props to child components.
 *
 * Q3: What is the role of a “topic map” in an interview prep app?
 * A: It helps organize content by concept so candidates can focus on discrete areas.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InterviewQuestionSet from '../components/interview/InterviewQuestionSet';
import { topicInterviewQuestions } from '../data/interviewBank';

const metrics = [
  { label: 'Hooks Covered', value: '15+', trend: 'Core and custom hooks' },
  { label: 'Practice Areas', value: '6', trend: 'Routing, Redux, forms' },
  { label: 'Examples', value: '50+', trend: 'Hands-on interview code' },
];

const topics = [
  {
    title: 'State Management',
    description: 'Practice useState, useReducer, Context API, and Redux Toolkit patterns.',
  },
  {
    title: 'Routing and Auth',
    description: 'Understand protected routes, redirects, and authenticated navigation.',
  },
  {
    title: 'Forms',
    description: 'Compare controlled and uncontrolled inputs with validation examples.',
  },
  {
    title: 'Hooks',
    description: 'Review built-in hooks and custom hook extraction with working demos.',
  },
];

const recentActivity = [
  ['Redux game logic', 'Move handling, scores, undo'],
  ['Forms demo', 'Validation and debounced input'],
  ['Protected dashboard', 'AuthContext and route guard'],
];

const interviewTips = [
  'Start with the problem in plain English before writing code.',
  'Explain trade-offs when choosing state, context, Redux, or refs.',
  'Name render performance risks only when they matter to the UI.',
  'Use small examples to describe hooks, effects, cleanup, and dependencies.',
];

const interviewQuestions = [
  {
    question: 'When would you use useReducer instead of useState?',
    answer: 'Use useReducer when state transitions are related, multi-step, or easier to describe as actions.',
  },
  {
    question: 'What problem does useEffect cleanup solve?',
    answer: 'Cleanup removes subscriptions, timers, listeners, or pending work before the next effect or unmount.',
  },
  {
    question: 'How do protected routes work in React Router?',
    answer: 'They check auth state before rendering and redirect unauthenticated users to a login route.',
  },
  {
    question: 'Why can Context cause extra renders?',
    answer: 'Every consumer can re-render when the provider value changes, so split context by responsibility.',
  },
];

function Home() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  return (
    <div className="page-shell">
      <header className="page-header">
        <p className="page-eyebrow">React Interview Ready</p>
        <h1 className="page-title">A clean practice dashboard for React concepts.</h1>
        <p className="page-subtitle">
          Review the most common React interview topics through small, focused examples with
          clear spacing, readable cards, and simple navigation.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <div className="card accent-card metric-card">
          <div>
            <p className="card-title">Current Focus</p>
            <p className="card-muted">Prepare with practical React examples.</p>
          </div>
          <div>
            <div className="metric-value">Ready</div>
            <div className="metric-trend">Start with any module</div>
          </div>
        </div>

        {metrics.map((metric) => (
          <div className="card metric-card" key={metric.label}>
            <div>
              <p className="card-title">{metric.label}</p>
              <p className="card-muted">{metric.trend}</p>
            </div>
            <div className="metric-value">{metric.value}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
              <div>
                <h2 className="card-title text-lg">Study Modules</h2>
                <p className="card-muted">Pick a topic and work through the live demo.</p>
              </div>
              <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden w-fit">
                {['week', 'month'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${
                      selectedPeriod === period
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {period === 'week' ? 'Week' : 'Month'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/game" className="block rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-500 hover:shadow-sm transition">
                <p className="page-eyebrow">Redux</p>
                <h3 className="card-title">Tic-Tac-Toe</h3>
                <p className="card-muted">Practice selectors, actions, and reducer-driven UI.</p>
              </Link>
              <Link to="/hooks" className="block rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-500 hover:shadow-sm transition">
                <p className="page-eyebrow">Hooks</p>
                <h3 className="card-title">Hooks Demo</h3>
                <p className="card-muted">Explore built-in hooks and reusable custom hooks.</p>
              </Link>
              <Link to="/forms" className="block rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-500 hover:shadow-sm transition">
                <p className="page-eyebrow">Forms</p>
                <h3 className="card-title">Form Patterns</h3>
                <p className="card-muted">Compare controlled and uncontrolled form approaches.</p>
              </Link>
              <Link to="/login" className="block rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-blue-500 hover:shadow-sm transition">
                <p className="page-eyebrow">Auth</p>
                <h3 className="card-title">Protected Routes</h3>
                <p className="card-muted">Review login flow and route access protection.</p>
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="card-title text-lg mb-4">Interview Topic Map</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topics.map((topic) => {
                const questionCount = topicInterviewQuestions.find((item) => item.title === topic.title);

                return (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4" key={topic.title}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{topic.title}</h3>
                  <p className="card-muted">{topic.description}</p>
                  {questionCount && (
                    <p className="mt-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {questionCount.beginner.length + questionCount.advanced.length} interview questions
                    </p>
                  )}
                </div>
                );
              })}
            </div>
          </div>

          {topicInterviewQuestions.map((topic) => (
            <InterviewQuestionSet
              key={topic.title}
              title={`${topic.title} Questions`}
              description={topic.description}
              beginner={topic.beginner}
              advanced={topic.advanced}
            />
          ))}

          <div className="card">
            <div className="mb-5">
              <h2 className="card-title text-lg">Interview Tips</h2>
              <p className="card-muted">Use these habits while explaining your code in interviews.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {interviewTips.map((tip, index) => (
                <div className="flex gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-4" key={tip}>
                  <span className="w-7 h-7 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="mb-5">
              <h2 className="card-title text-lg">Common Interview Questions</h2>
              <p className="card-muted">Short, interview-ready answers for important React concepts.</p>
            </div>
            <div className="space-y-4">
              {interviewQuestions.map((item) => (
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0" key={item.question}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.question}</h3>
                  <p className="card-muted">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card">
            <h2 className="card-title text-lg mb-4">Progress Snapshot</h2>
            <div className="space-y-4">
              {[
                ['Concept Review', '72%'],
                ['Practice Code', '58%'],
                ['Mock Questions', '84%'],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700 dark:text-gray-300">{label}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="card-title text-lg mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map(([title, description]) => (
                <div className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0 last:pb-0" key={title}>
                  <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
                  <p className="card-muted">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default Home;
