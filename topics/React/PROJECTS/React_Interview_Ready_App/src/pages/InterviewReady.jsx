import {
  reactInterviewChecklist,
  reactInterviewScenarios,
  reactInterviewTopics,
} from '../data/reactInterviewReady';

function InterviewReady() {
  return (
    <div className="page-shell interview-ready-page">
      <header className="page-header">
        <p className="page-eyebrow">Complete React Guide</p>
        <h1 className="page-title">React Interview Ready Page</h1>
        <p className="page-subtitle">
          A focused React interview reference covering core concepts, advanced questions,
          scenario-based answers, and code examples you can revise before interviews.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="card accent-card lg:col-span-2">
          <p className="card-title">How to answer React interview questions</p>
          <p className="card-muted">
            Start with the concept, explain the trade-off, connect it to a real UI scenario,
            then mention one implementation detail or code pattern.
          </p>
          <div className="interview-stat-row">
            <div>
              <span>{reactInterviewTopics.length}</span>
              <small>Topics</small>
            </div>
            <div>
              <span>{reactInterviewScenarios.length}</span>
              <small>Scenarios</small>
            </div>
            <div>
              <span>2</span>
              <small>Levels per topic</small>
            </div>
          </div>
        </div>

        <aside className="card">
          <h2 className="card-title text-lg mb-4">Quick Checklist</h2>
          <ul className="interview-checklist">
            {reactInterviewChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="card mb-6">
        <h2 className="card-title text-lg mb-4">Topic Index</h2>
        <div className="topic-index-grid">
          {reactInterviewTopics.map((topic) => (
            <a href={`#${topic.id}`} className="topic-index-link" key={topic.id}>
              {topic.title}
            </a>
          ))}
        </div>
      </section>

      <section className="card mb-6">
        <div className="mb-5">
          <p className="page-eyebrow">Scenario Round</p>
          <h2 className="card-title text-lg">Common React Scenarios</h2>
          <p className="card-muted">
            These are the kinds of practical follow-up questions interviewers often ask.
          </p>
        </div>
        <div className="scenario-grid">
          {reactInterviewScenarios.map((scenario) => (
            <article className="scenario-card" key={scenario.title}>
              <h3>{scenario.title}</h3>
              <p>{scenario.response}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="interview-topic-list">
        {reactInterviewTopics.map((topic) => (
          <article className="interview-topic-card" id={topic.id} key={topic.id}>
            <div className="interview-topic-header">
              <div>
                <p className="page-eyebrow">React Topic</p>
                <h2>{topic.title}</h2>
                <p>{topic.summary}</p>
              </div>
            </div>

            <div className="interview-topic-grid">
              <div className="interview-topic-panel">
                <h3>Must Know</h3>
                <ul>
                  {topic.mustKnow.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="interview-topic-panel">
                <h3>Scenario</h3>
                <p className="scenario-question">{topic.scenario}</p>
                <p>{topic.approach}</p>
              </div>
            </div>

            <div className="interview-level-grid">
              <div className="interview-level-card">
                <h3>Beginner Questions</h3>
                <div className="interview-question-list">
                  {topic.beginnerQuestions.map((item) => (
                    <div className="interview-question-item" key={item.question}>
                      <h4>{item.question}</h4>
                      <p>{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="interview-level-card">
                <h3>Advanced Questions</h3>
                <div className="interview-question-list">
                  {topic.advancedQuestions.map((item) => (
                    <div className="interview-question-item" key={item.question}>
                      <h4>{item.question}</h4>
                      <p>{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {topic.code && (
              <div className="code-example">
                <h3>Example Code</h3>
                <pre>
                  <code>{topic.code}</code>
                </pre>
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}

export default InterviewReady;
