import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

/**
 * BAR CHART COMPONENT
 * 
 * Interview Topics Covered:
 * - Data visualization with bars
 * - Component composition
 * - Props validation
 * - Responsive design
 */

const BarChartComponent = ({
    data,
    dataKeys = [],
    xAxisKey = 'name',
    height = 300,
    colors = ['#667eea', '#764ba2', '#11998e'],
    showGrid = true,
    showLegend = true,
    title = '',
    horizontal = false
}) => {
    const ChartComponent = horizontal ? BarChart : BarChart;

    return (
        <div className="w-full">
            {title && (
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    {title}
                </h3>
            )}
            <ResponsiveContainer width="100%" height={height}>
                <ChartComponent
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    layout={horizontal ? 'vertical' : 'horizontal'}
                >
                    {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />}
                    <XAxis
                        dataKey={horizontal ? undefined : xAxisKey}
                        type={horizontal ? 'number' : 'category'}
                        stroke="#666"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        dataKey={horizontal ? xAxisKey : undefined}
                        type={horizontal ? 'category' : 'number'}
                        stroke="#666"
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    {showLegend && <Legend />}
                    {dataKeys.map((key, index) => (
                        <Bar
                            key={key}
                            dataKey={key}
                            fill={colors[index % colors.length]}
                            radius={[8, 8, 0, 0]}
                        />
                    ))}
                </ChartComponent>
            </ResponsiveContainer>
        </div>
    );
};

BarChartComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    dataKeys: PropTypes.arrayOf(PropTypes.string),
    xAxisKey: PropTypes.string,
    height: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
    showGrid: PropTypes.bool,
    showLegend: PropTypes.bool,
    title: PropTypes.string,
    horizontal: PropTypes.bool
};

export default BarChartComponent;

// Made with Bob
