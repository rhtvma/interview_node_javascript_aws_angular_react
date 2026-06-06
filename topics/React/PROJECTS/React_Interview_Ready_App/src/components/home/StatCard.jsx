import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * STAT CARD COMPONENT - Interview Topic: UI Component Design
 *
 * Purpose: Display a small statistics card with gradient styling.
 * Interview Points:
 * - Presentational component design
 * - Prop-driven styling and text
 * - Memoization for render optimization
 *
 * Interview Questions to Prepare:
 * Q1: What is a presentational component?
 * A: A component focused on UI rendering and layout, with minimal logic.
 *
 * Q2: When is using React.memo useful for display cards?
 * A: When props do not change often and the component is expensive to re-render.
 *
 * Q3: How should a stat card accept styling variants?
 * A: Via props like gradient and labelColor to keep it flexible.
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
