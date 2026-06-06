import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * TOPIC CARD COMPONENT - Interview Topic: Reusable Cards
 *
 * Purpose: Render a topic card with a title, icon, and checklist items.
 * Interview Points:
 * - Component composition and props structure
 * - Array mapping for lists
 * - Reusability with styling variants
 *
 * Interview Questions to Prepare:
 * Q1: What are the benefits of reusable card components?
 * A: They reduce duplication, simplify layout changes, and keep UI consistent.
 *
 * Q2: How do you handle dynamic list rendering in React?
 * A: Map over arrays and use stable keys for each element.
 *
 * Q3: Why pass style classes as props?
 * A: It lets the parent control visual variants without hard-coding styles.
 */

const TopicCard = memo(({ icon, title, items, borderColor, checkColor }) => {
  return (
    <div className={`p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 ${borderColor}`}>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <span className="text-2xl mr-3">{icon}</span>
        {title}
      </h3>
      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className={`${checkColor} mr-2`}>✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

TopicCard.displayName = 'TopicCard';

TopicCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  borderColor: PropTypes.string.isRequired,
  checkColor: PropTypes.string.isRequired,
};

export default TopicCard;

// Made with ❤️ for Interview Preparation
