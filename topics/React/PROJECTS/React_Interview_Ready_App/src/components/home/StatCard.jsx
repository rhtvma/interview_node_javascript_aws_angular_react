import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * STAT CARD COMPONENT
 * Reusable card for displaying statistics with gradient backgrounds
 * 
 * Interview Topics: Component Composition, Props, React.memo
 */

const StatCard = memo(({ value, label, gradient, labelColor }) => {
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className={labelColor}>{label}</div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

StatCard.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  gradient: PropTypes.string.isRequired,
  labelColor: PropTypes.string.isRequired,
};

export default StatCard;

// Made with ❤️ for Interview Preparation
