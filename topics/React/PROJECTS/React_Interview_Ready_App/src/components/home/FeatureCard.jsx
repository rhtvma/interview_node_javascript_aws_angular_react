import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * FEATURE CARD COMPONENT
 * Reusable card for displaying feature links with gradient backgrounds
 * 
 * Interview Topics: Component Composition, Props, React.memo
 */

const FeatureCard = memo(({ to, icon, title, description, gradient, actionText }) => {
    return (
        <Link to={to} className="group">
            <div className={`h-full p-6 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300`}>
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className={`mb-4 ${gradient.includes('blue') ? 'text-blue-100' : gradient.includes('purple') ? 'text-purple-100' : gradient.includes('pink') ? 'text-pink-100' : gradient.includes('green') ? 'text-green-100' : 'text-orange-100'}`}>
                    {description}
                </p>
                <div className="flex items-center text-sm font-semibold">
                    <span>{actionText}</span>
                    <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
            </div>
        </Link>
    );
});

FeatureCard.displayName = 'FeatureCard';

FeatureCard.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    gradient: PropTypes.string.isRequired,
    actionText: PropTypes.string.isRequired,
};

export default FeatureCard;

// Made with ❤️ for Interview Preparation
