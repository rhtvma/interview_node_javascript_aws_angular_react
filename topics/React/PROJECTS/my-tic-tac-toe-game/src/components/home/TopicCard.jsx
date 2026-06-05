import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * TOPIC CARD COMPONENT
 * Reusable card for displaying interview topics with checklist items
 * 
 * Interview Topics: Component Composition, Props, React.memo, Array Mapping
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
