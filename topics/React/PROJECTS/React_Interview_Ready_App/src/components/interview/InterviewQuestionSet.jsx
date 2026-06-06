import PropTypes from 'prop-types';

function InterviewQuestionSet({ title, description, beginner, advanced }) {
  return (
    <section className="interview-question-set">
      <div className="interview-question-header">
        <div>
          <p className="page-eyebrow">Interview Ready</p>
          <h2 className="card-title text-lg">{title}</h2>
          {description && <p className="card-muted">{description}</p>}
        </div>
      </div>

      <div className="interview-level-grid">
        <div className="interview-level-card">
          <h3>Beginner Level</h3>
          <div className="interview-question-list">
            {beginner.map((item) => (
              <article className="interview-question-item" key={item.question}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="interview-level-card">
          <h3>Advanced Level</h3>
          <div className="interview-question-list">
            {advanced.map((item) => (
              <article className="interview-question-item" key={item.question}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const questionShape = PropTypes.shape({
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
});

InterviewQuestionSet.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  beginner: PropTypes.arrayOf(questionShape).isRequired,
  advanced: PropTypes.arrayOf(questionShape).isRequired,
};

InterviewQuestionSet.defaultProps = {
  description: '',
};

export default InterviewQuestionSet;
